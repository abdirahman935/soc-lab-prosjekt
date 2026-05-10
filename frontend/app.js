import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import htm from "https://esm.sh/htm@3.1.1";

// Her bruker vi htm, slik at dere kan lese React-koden uten JSX og uten eget byggetrinn.
const html = htm.bind(React.createElement);

// Disse kortene viser nøkkeltall når dashboardet mottar ekte data fra laben.
const metricDefinitions = [
  ["failedLogonsLastWindow", "Feil passord", "Mislykkede pålogginger i siste periode."],
  ["lockedAccountsLastWindow", "Låste kontoer", "Brukere som har blitt låst."],
  ["serviceFailuresLastWindow", "Tjenestefeil", "Servertjenester som har stoppet."],
  ["gpoIssuesLastWindow", "GPO-feil", "Klienter eller servere som ikke har fått riktig policy."],
  ["defenderAlertsLastWindow", "Defender-varsler", "Varsler fra Microsoft Defender."],
  ["sysmonEventsLastWindow", "Sysmon-hendelser", "Utvalgte prosess- og nettverkshendelser."],
];

// Disse stegene vises når dashboardet ennå ikke er koblet til ekte data fra Windows-laben.
const setupSteps = [
  {
    title: "1. Sett opp domenet",
    description:
      "Opprett domenekontrolleren i Windows Server, og sørg for at domenet fungerer før dere går videre.",
  },
  {
    title: "2. Koble klient-PC-er",
    description:
      "Legg klientene inn i domenet og test at innlogging, DNS og grunnleggende tilgang virker som det skal.",
  },
  {
    title: "3. Slå på logging",
    description:
      "Aktiver relevante logger, bruk WEF og Sysmon, og sørg for at collector-serveren faktisk mottar hendelser.",
  },
  {
    title: "4. Oppdater dashboardet",
    description:
      "Når eksporten fra Windows Server kjører, skal denne siden vise ekte hendelser fra laben deres.",
  },
];

// Denne oversikten gjør Event ID-ene mer lesbare
const eventDefinitions = {
  1: "Prosess startet",
  3: "Nettverkstilkobling",
  11: "Fil opprettet",
  13: "Register endret",
  22: "DNS-spørring",
  1030: "GPO-feil",
  1058: "GPO-feil",
  1116: "Defender-varsel",
  1117: "Defender-oppfølging",
  1118: "Defender-oppfølging",
  1119: "Defender-oppfølging",
  4625: "Mislykket pålogging",
  4740: "Konto låst",
  7031: "Tjeneste stoppet",
  7034: "Tjeneste stoppet",
};

const severityLabels = {
  high: "Høy",
  medium: "Middels",
  low: "Lav",
};

const serviceStatusLabels = {
  Running: "Kjører",
  Stopped: "Stoppet",
};

function formatDateTime(value) {
  // Her gjør vi tidspunktet mer leselig, slik at dere raskere ser når noe skjedde.
  if (!value) {
    return "Ikke oppdatert ennå";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function getRiskStatus(alerts = []) {
  // Denne funksjonen lager en enkel status som oppsummerer alarmsituasjonen øverst på siden.
  if (alerts.some((alert) => alert.severity === "high")) {
    return { label: "Høy aktivitet", tone: "severity-high" };
  }

  if (alerts.some((alert) => alert.severity === "medium")) {
    return { label: "Noe må undersøkes", tone: "severity-medium" };
  }

  return { label: "Ingen alarmer nå", tone: "severity-low" };
}

function getSeverityLabel(value) {
  return severityLabels[value] || value || "Ukjent";
}

function getEventLabel(id) {
  return eventDefinitions[id] || "Annen hendelse";
}

function truncateText(value, maxLength = 170) {
  // Lange meldinger kuttes ned slik at tabellen fortsatt er oversiktlig å lese.
  if (!value) {
    return "Ingen melding tilgjengelig.";
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3)}...`;
}

function buildDerivedMachines(payload) {
  // Hvis miljødata mangler, prøver vi å hente maskinnavn fra resten av datasettet.
  const set = new Set();

  for (const item of payload.serverStatus || []) {
    if (item.computer) {
      set.add(item.computer);
    }
  }

  for (const item of payload.recentEvents || []) {
    if (item.machine) {
      set.add(item.machine);
    }
  }

  return [...set];
}

function getEnvironment(payload) {
  // Her samler vi den viktigste informasjonen om labmiljøet på ett sted.
  const environment = payload.environment || {};
  const monitoredComputers =
    environment.monitoredComputers && environment.monitoredComputers.length
      ? environment.monitoredComputers
      : buildDerivedMachines(payload);

  return {
    domain: environment.domain || "Ikke satt ennå",
    collectorServer: environment.collectorServer || "Ikke satt ennå",
    monitoredComputers,
    source: environment.source || "Ukjent kilde",
    dataMode: environment.dataMode || "sample",
  };
}

function isLiveData(payload) {
  return getEnvironment(payload).dataMode === "live";
}

function isServerName(name) {
  return /^SRV[-_]/i.test(name || "");
}

function countServers(names) {
  return names.filter((name) => isServerName(name)).length;
}

function countClients(names) {
  return names.filter((name) => !isServerName(name)).length;
}

function buildFocusItems(payload, liveData) {
  // Her viser frontend ulike hjelpetekster avhengig av om vi har ekte data eller ikke.
  if (!liveData) {
    return setupSteps;
  }

  const metrics = payload.metrics || {};
  const items = [];

  if ((metrics.failedLogonsLastWindow || 0) > 0) {
    items.push({
      title: "Se på mislykkede pålogginger",
      description:
        "Finn brukere og maskiner som går igjen. Dette er ofte første spor i analysen.",
    });
  }

  if ((metrics.gpoIssuesLastWindow || 0) > 0) {
    items.push({
      title: "Sjekk GPO og DNS",
      description:
        "Hvis policy ikke treffer riktig, må dere sjekke OU, DNS og gpresult på den berørte klienten.",
    });
  }

  if ((metrics.serviceFailuresLastWindow || 0) > 0) {
    items.push({
      title: "Kontroller tjenester på serverne",
      description:
        "Se hvilken tjeneste som har stoppet, og vurder hvilken del av domenet som blir påvirket.",
    });
  }

  if ((metrics.defenderAlertsLastWindow || 0) > 0 || (metrics.sysmonEventsLastWindow || 0) > 0) {
    items.push({
      title: "Undersøk sikkerhetshendelser",
      description:
        "Bruk Event ID, maskinnavn og tidspunkt for å forklare om hendelsen virker normal eller mistenkelig.",
    });
  }

  if (!items.length) {
    items.push({
      title: "Bruk hendelsene som utgangspunkt",
      description:
        "Hvis det ikke er tydelige alarmer, kan dere starte med de nyeste hendelsene og forklare hva de betyr.",
    });
  }

  return items.slice(0, 4);
}

function App() {
  const [payload, setPayload] = useState(null);
  const [fatalError, setFatalError] = useState("");
  const [notice, setNotice] = useState("");
  const [dataSource, setDataSource] = useState("Laster...");

  useEffect(() => {
    let cancelled = false;

    async function loadSummary() {
      try {
        // Først prøver vi Python-backend. Hvis den ikke svarer, bruker vi en enkel lokal eksempelfil.
        const sources = [
          { url: "http://127.0.0.1:8001/api/summary", kind: "backend" },
          { url: "./data/sample-soc-summary.json", kind: "sample" },
        ];

        let lastError = null;

        for (const source of sources) {
          try {
            const response = await fetch(source.url, { cache: "no-store" });
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            const json = await response.json();
            const live = isLiveData(json);

            if (!cancelled) {
              // Her oppdateres selve dashboardet med det nyeste datasettet vi klarer å hente.
              setPayload(json);
              setFatalError("");

              if (source.kind === "backend" && live) {
                setDataSource("Live-data fra Windows-laben");
                setNotice("");
              } else if (source.kind === "backend") {
                setDataSource("Backend uten live-data");
                setNotice(
                  "Dashboardet har kontakt med backend, men venter fortsatt på ekte eksport fra Windows Server."
                );
              } else {
                setDataSource("Lokal eksempelfil");
                setNotice(
                  "Backend er ikke startet ennå. Derfor vises en tom eksempelside i stedet for ekte SOC-data."
                );
              }
            }
            return;
          } catch (err) {
            lastError = err;
          }
        }

        throw lastError ?? new Error("Kunne ikke hente data til dashboardet.");
      } catch (err) {
        if (!cancelled) {
          setPayload(null);
          setFatalError(err.message);
        }
      }
    }

    loadSummary();
    // Siden henter nye data jevnlig, slik at den kan brukes som et enkelt overvåkingspanel.
    const intervalId = window.setInterval(loadSummary, 15000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  if (fatalError) {
    return html`
      <main className="page-shell">
        <section className="panel panel-full">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Feil</p>
              <h2>Dashboardet fikk ikke hentet data</h2>
            </div>
          </div>
          <p className="empty-state">${fatalError}</p>
        </section>
      </main>
    `;
  }

  if (!payload) {
    return html`
      <main className="page-shell">
        <section className="panel panel-full">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Starter</p>
              <h2>Laster SOC-dashboardet</h2>
            </div>
          </div>
          <p className="empty-state">Venter på data fra backend eller en lokal eksempelfil.</p>
        </section>
      </main>
    `;
  }

  const environment = getEnvironment(payload);
  const liveData = environment.dataMode === "live";
  const risk = getRiskStatus(payload.alerts);
  const monitoredComputers = environment.monitoredComputers || [];
  const serverCount = countServers(monitoredComputers);
  const clientCount = countClients(monitoredComputers);
  const focusItems = buildFocusItems(payload, liveData);
  const events = (payload.recentEvents || []).slice(0, 8);
  const services = (payload.serverStatus || []).slice(0, 6);
  const displayDomain = liveData ? environment.domain : "Windows Server-lab";

  return html`
    <!-- Hele frontend vises her som en React-komponent. -->
    <div className="page-shell">
      <header className="hero">
        <section className="hero-copy">
          <p className="eyebrow">Individuell oppgave i 2IT</p>
          <h1>SOC-dashboard for ${displayDomain}</h1>
          <p className="hero-text">
            React- og Python-delen er allerede laget. Oppgaven din er å sette opp Windows Server,
            domene, klient-PC-er og loggsamling slik at denne siden viser ekte data fra laben.
          </p>
        </section>

        <aside className="hero-side">
          <div className=${`state-card ${liveData ? "state-live" : "state-waiting"}`}>
            <span className="state-label">${liveData ? "Live-data aktiv" : "Venter på live-data"}</span>
            <strong>${dataSource}</strong>
          </div>
          <div className="meta-stack">
            <article className="meta-card">
              <span className="meta-label">Domene</span>
              <strong>${environment.domain}</strong>
            </article>
            <article className="meta-card">
              <span className="meta-label">Collector</span>
              <strong>${environment.collectorServer}</strong>
            </article>
            <article className="meta-card">
              <span className="meta-label">Sist oppdatert</span>
              <strong>${formatDateTime(payload.generatedAt)}</strong>
            </article>
          </div>
        </aside>
      </header>

      ${
        notice
          ? html`
              <section className="notice-banner">
                <strong>Merk:</strong> ${notice}
              </section>
            `
          : null
      }

      <section className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Servere</span>
          <strong className="summary-value">${liveData ? serverCount : "—"}</strong>
          <p>Maskiner med serverrolle i oversikten.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Klient-PC-er</span>
          <strong className="summary-value">${liveData ? clientCount : "—"}</strong>
          <p>Klienter som er med i datagrunnlaget.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Tjenester</span>
          <strong className="summary-value">${liveData ? services.length : "—"}</strong>
          <p>Servertjenester som rapporteres inn nå.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Hendelser</span>
          <strong className="summary-value">${liveData ? events.length : "—"}</strong>
          <p>Siste hendelser som vises i tabellen.</p>
        </article>
      </section>

      <main className="dashboard-grid">
        <section className="panel panel-wide">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Oversikt</p>
              <h2>${liveData ? "Hva skjer i laben nå?" : "Her kommer live-dataene deres"}</h2>
            </div>
            <span className=${`status-pill ${risk.tone}`}>${liveData ? risk.label : "Ikke klar ennå"}</span>
          </div>
          <div className="metric-grid">
            ${metricDefinitions.map(
              ([key, label, description]) => html`
                <article className="metric-card" key=${key}>
                  <span className="metric-label">${label}</span>
                  <strong className="metric-value">${liveData ? payload.metrics?.[key] ?? 0 : "—"}</strong>
                  <p className="metric-subtext">${description}</p>
                </article>
              `
            )}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">${liveData ? "Fokus" : "Oppsett"}</p>
              <h2>${liveData ? "Hva bør du sjekke nå?" : "Hva må være på plass?"}</h2>
            </div>
          </div>
          <div className="focus-list">
            ${focusItems.map(
              (item) => html`
                <article className="focus-item" key=${item.title}>
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                </article>
              `
            )}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Miljø</p>
              <h2>Maskiner i oversikten</h2>
            </div>
          </div>
          ${
            liveData && monitoredComputers.length
              ? html`
                  <div className="machine-list">
                    ${monitoredComputers.map(
                      (name) => html`
                        <span className=${`machine-pill ${isServerName(name) ? "machine-server" : "machine-client"}`}>
                          ${name}
                        </span>
                      `
                    )}
                  </div>
                `
              : html`
                  <p className="empty-state">
                    Når Windows-laben sender ekte data, vil servere og klient-PC-er vises her.
                  </p>
                `
          }
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Tjenester</p>
              <h2>Status på servertjenester</h2>
            </div>
          </div>
          ${
            liveData && services.length
              ? html`
                  <div className="service-list">
                    ${services.map(
                      (service) => html`
                        <article className="service-card" key=${`${service.computer}-${service.service}`}>
                          <div>
                            <h3 className="service-role">${service.service}</h3>
                            <p className="service-meta">${service.computer}</p>
                          </div>
                          <span
                            className=${`service-status ${
                              service.status === "Running" ? "status-running" : "status-stopped"
                            }`}
                          >
                            ${serviceStatusLabels[service.status] || service.status}
                          </span>
                        </article>
                      `
                    )}
                  </div>
                `
              : html`
                  <p className="empty-state">
                    Ingen tjenestedata vises ennå. Start med collector-server og sørg for at eksporten faktisk kjører.
                  </p>
                `
          }
        </section>

        <section className="panel panel-full">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Hendelser</p>
              <h2>Siste hendelser fra domenet</h2>
            </div>
          </div>
          ${
            liveData && events.length
              ? html`
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Tid</th>
                          <th>Maskin</th>
                          <th>Event ID</th>
                          <th>Type</th>
                          <th>Melding</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${events.map(
                          (event) => html`
                            <tr key=${`${event.machine}-${event.id}-${event.timeCreated}`}>
                              <td>${formatDateTime(event.timeCreated)}</td>
                              <td>${event.machine}</td>
                              <td>${event.id}</td>
                              <td>${getEventLabel(event.id)}</td>
                              <td className="event-message">${truncateText(event.message)}</td>
                            </tr>
                          `
                        )}
                      </tbody>
                    </table>
                  </div>
                `
              : html`
                  <p className="empty-state">
                    Ingen live-hendelser vises ennå. Når klientene er koblet til domenet og loggene sendes inn,
                    vil denne tabellen fylles automatisk.
                  </p>
                `
          }
        </section>
      </main>
    </div>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
