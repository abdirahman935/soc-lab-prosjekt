[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$SysmonZipPath,
    [Parameter(Mandatory)][string]$ConfigPath,
    [string]$InstallPath = 'C:\SOC\Tools\Sysmon'
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

if (-not (Test-Path -Path $SysmonZipPath)) {
    throw "Fant ikke Sysmon-arkivet: $SysmonZipPath"
}

if (-not (Test-Path -Path $ConfigPath)) {
    throw "Fant ikke Sysmon-config: $ConfigPath"
}

New-Item -Path $InstallPath -ItemType Directory -Force | Out-Null
Expand-Archive -Path $SysmonZipPath -DestinationPath $InstallPath -Force

$sysmonExe = Join-Path -Path $InstallPath -ChildPath 'Sysmon64.exe'
if (-not (Test-Path -Path $sysmonExe)) {
    $sysmonExe = Join-Path -Path $InstallPath -ChildPath 'Sysmon.exe'
}

if (-not (Test-Path -Path $sysmonExe)) {
    throw 'Fant verken Sysmon64.exe eller Sysmon.exe etter utpakking.'
}

$existingService = Get-Service -Name 'Sysmon64' -ErrorAction SilentlyContinue
if (-not $existingService) {
    $existingService = Get-Service -Name 'Sysmon' -ErrorAction SilentlyContinue
}

if ($existingService) {
    & $sysmonExe -accepteula -c $ConfigPath
    Write-Host 'Sysmon-konfigurasjon oppdatert.'
} else {
    & $sysmonExe -accepteula -i $ConfigPath
    Write-Host 'Sysmon installert.'
}
