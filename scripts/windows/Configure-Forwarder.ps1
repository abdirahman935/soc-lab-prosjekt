[CmdletBinding()]
param(
    [switch]$EnablePowerShellScriptBlockLogging
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

function Enable-LogIfPresent {
    param([Parameter(Mandatory)][string]$LogName)

    $null = & wevtutil gl $LogName 2>$null
    if ($LASTEXITCODE -eq 0) {
        & wevtutil sl $LogName /e:true | Out-Null
    }
}

& winrm quickconfig -q | Out-Null
Set-Service -Name 'WinRM' -StartupType Automatic
Start-Service -Name 'WinRM'

$localGroupOutput = & net localgroup 'Event Log Readers' 'NT AUTHORITY\NETWORK SERVICE' /add 2>&1
if ($LASTEXITCODE -ne 0 -and ($localGroupOutput -join ' ') -notmatch 'already') {
    throw ($localGroupOutput -join [Environment]::NewLine)
}

Enable-LogIfPresent -LogName 'Microsoft-Windows-PowerShell/Operational'
Enable-LogIfPresent -LogName 'Microsoft-Windows-GroupPolicy/Operational'
Enable-LogIfPresent -LogName 'Microsoft-Windows-Windows Defender/Operational'
Enable-LogIfPresent -LogName 'Microsoft-Windows-Sysmon/Operational'

if ($EnablePowerShellScriptBlockLogging) {
    $basePath = 'HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell'
    $scriptBlockPath = Join-Path -Path $basePath -ChildPath 'ScriptBlockLogging'

    New-Item -Path $basePath -Force | Out-Null
    New-Item -Path $scriptBlockPath -Force | Out-Null
    New-ItemProperty -Path $scriptBlockPath -Name 'EnableScriptBlockLogging' -PropertyType DWord -Value 1 -Force | Out-Null
}

Write-Host ''
Write-Host 'Forwarder er klargjort.'
Write-Host 'Husk a sette Subscription Manager i GPO eller lokal policy.'
