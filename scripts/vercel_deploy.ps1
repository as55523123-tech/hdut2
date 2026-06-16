<#
PowerShell helper to build and deploy the client (dist/public) to Vercel using a token.

Usage examples:
# 1) Use env token and interactive prompts:
$env:VERCEL_TOKEN = 'vcp_...'
.\scripts\vercel_deploy.ps1

# 2) Provide token and project name as parameters:
.\scripts\vercel_deploy.ps1 -Token 'vcp_...' -ProjectName 'my-site' -SetEnv @{
    VITE_OAUTH_PORTAL_URL = 'https://api.example.com'
    VITE_APP_ID = 'your-app-id'
}

Notes:
- This script runs `pnpm install` and `pnpm run build` then calls `npx vercel deploy` to deploy `dist/public`.
- For environment variables the script will print the `npx vercel env add` commands for you to run (Windows PowerShell may require interactive input when using `vercel env add`).
- You must have Node/pnpm installed on the machine you run this on.
#>

param(
    [string] $Token,
    [string] $ProjectName,
    [hashtable] $SetEnv
)

function Prompt-ForToken {
    Write-Host "Vercel token not provided via -Token. Checking environment variable VERCEL_TOKEN..."
    if ($env:VERCEL_TOKEN) { return $env:VERCEL_TOKEN }
    $secure = Read-Host "Enter Vercel token" -AsSecureString
    return [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
}

if (-not $Token) { $Token = Prompt-ForToken }
if (-not $Token) { Write-Error "No Vercel token provided. Aborting."; exit 1 }

$cwd = Get-Location
Write-Host "Working directory: $cwd"

# Ensure pnpm dependencies
Write-Host "Installing dependencies (pnpm install)..."
pnpm install
if ($LASTEXITCODE -ne 0) { Write-Error "pnpm install failed"; exit 1 }

# Build
Write-Host "Building project (pnpm run build)..."
pnpm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; exit 1 }

# Deploy static output to Vercel
$distPath = Join-Path $cwd 'dist\public'
if (-not (Test-Path $distPath)) { Write-Error "Build output not found at $distPath"; exit 1 }

$deployCmd = @('npx', 'vercel', 'deploy', $distPath, '--prod', '--token', $Token, '--confirm') -join ' '
Write-Host "Deploying to Vercel (this will upload files and create/associate a project if needed)..."
Write-Host $deployCmd
# Execute
Invoke-Expression $deployCmd
if ($LASTEXITCODE -ne 0) { Write-Error "Vercel deploy failed"; exit 1 }

Write-Host "Deploy finished. If this is a new project, note the project name returned by the deploy output."

if ($ProjectName) {
    Write-Host "Project name provided: $ProjectName"
} else {
    Write-Host "If you want to set environment variables automatically, provide -ProjectName or add them via the Vercel UI."
}

# Print commands to add env vars via vercel CLI (Windows interactive may require manual paste)
if ($SetEnv) {
    Write-Host "\nEnvironment variable commands (copy & run for each):"
    foreach ($k in $SetEnv.Keys) {
        $v = $SetEnv[$k]
        Write-Host "npx vercel env add $k production --token $Token"
        Write-Host "(When prompted, paste the value:)"
        Write-Host "$k => $v\n"
    }
    Write-Host "Note: On Windows PowerShell the vercel CLI env add command may open interactive prompts. You can also set envs in Vercel UI (Project → Settings → Environment Variables)."
}

Write-Host "Done. Visit your Vercel dashboard to verify deployment and set any additional environment variables if needed." 