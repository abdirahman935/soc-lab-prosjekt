[CmdletBinding()]
param(
    [string]$CollectorName = $env:COMPUTERNAME,
    [string]$ExportPath = 'C:\SOC\exports'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Test-Administrator {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = [Security.Principal.WindowsPrincipal]::new($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Administrator)) {
    throw 'Kjor PowerShell som administrator.'
}

function Ensure-ServiceRunning {
    param([Parameter(Mandatory)][string]$Name)

    $service = Get-Service -Name $Name -ErrorAction Stop
    if ($service.StartType -ne 'Automatic') {
        Set-Service -Name $Name -StartupType Automatic
    }

    if ($service.Status -ne 'Running') {
        Start-Service -Name $Name
    }
}

New-Item -Path 'C:\SOC' -ItemType Directory -Force | Out-Null
New-Item -Path $ExportPath -ItemType Directory -Force | Out-Null

& winrm quickconfig -q | Out-Null
& wecutil qc /q | Out-Null

Ensure-ServiceRunning -Name 'WinRM'
Ensure-ServiceRunning -Name 'Wecsvc'

$summary = [pscustomobject]@{
    collector = $CollectorName
    exportPath = $ExportPath
    subscriptionManager = "Server=http://$CollectorName`:5985/wsman/SubscriptionManager/WEC,Refresh=60"
    nextSteps = @(
        'Opprett en source-initiated subscription pa collector-serveren.',
        'Bruk configs/wef/baseline-query.xml som utgangspunkt for query.',
        'Sett Subscription Manager i GPO for klienter og medlemsservere.',
        'Legg NT AUTHORITY\NETWORK SERVICE inn i Event Log Readers pa kildemaskiner.',
        'Installer Sysmon pa klienter og servere.'
    )
}

$summaryPath = Join-Path -Path 'C:\SOC' -ChildPath 'collector-setup.json'
$summary | ConvertTo-Json -Depth 4 | Set-Content -Path $summaryPath -Encoding UTF8

Write-Host ''
Write-Host 'Collector er klargjort.'
Write-Host "Subscription Manager: $($summary.subscriptionManager)"
Write-Host "Oppsummering lagret i: $summaryPath"
