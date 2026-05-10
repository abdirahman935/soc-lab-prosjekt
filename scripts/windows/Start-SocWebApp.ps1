[CmdletBinding()]
param(
    [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path,
    [string]$DataPath = 'C:\SOC\exports\soc-summary.json'
)

# Starter frontend og backend på Windows Server 2022.
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$backendPath = Join-Path $ProjectRoot 'backend\server.py'
$frontendPath = Join-Path $ProjectRoot 'frontend'
$fallbackDataPath = Join-Path $ProjectRoot 'backend\data\soc-summary.json'

if (-not (Test-Path $backendPath)) {
    throw "Fant ikke backend: $backendPath"
}

if (-not (Test-Path $frontendPath)) {
    throw "Fant ikke frontend-mappen: $frontendPath"
}

$selectedDataPath = $fallbackDataPath

# Hvis ekte eksport finnes, bruker vi den i stedet for eksempelfila.
if (Test-Path $DataPath) {
    $selectedDataPath = (Resolve-Path $DataPath).Path
}

$escapedProjectRoot = $ProjectRoot.Replace("'", "''")
$escapedFrontendPath = $frontendPath.Replace("'", "''")
$escapedDataPath = $selectedDataPath.Replace("'", "''")

$pythonLauncher = $null

if (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonLauncher = 'py'
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonLauncher = 'python'
} else {
    throw 'Fant verken py eller python. Installer Python for du starter webappen.'
}

# Lager to kommandoer: én for backend og én for frontend.
if ($pythonLauncher -eq 'py') {
    $backendArgs = "-NoExit -Command `"Set-Location '$escapedProjectRoot'; py -3 .\backend\server.py --data '$escapedDataPath'`""
    $frontendArgs = "-NoExit -Command `"Set-Location '$escapedFrontendPath'; py -3 -m http.server 4173`""
} else {
    $backendArgs = "-NoExit -Command `"Set-Location '$escapedProjectRoot'; python .\backend\server.py --data '$escapedDataPath'`""
    $frontendArgs = "-NoExit -Command `"Set-Location '$escapedFrontendPath'; python -m http.server 4173`""
}

Start-Process powershell.exe -ArgumentList $backendArgs | Out-Null
Start-Process powershell.exe -ArgumentList $frontendArgs | Out-Null

Write-Host 'Backend startes pa http://127.0.0.1:8001/api/summary'
Write-Host 'Frontend startes pa http://127.0.0.1:4173'
Write-Host "Backend leser data fra: $selectedDataPath"
