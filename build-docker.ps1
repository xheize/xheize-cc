# Docker Multi-Architecture Build Script for Xheize-CC

# Ensure Docker Desktop is running and buildx is installed
if (-not (Get-Command "docker" -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed or not in PATH."
    exit 1
}

# Create a new builder instance if one doesn't exist (optional but recommended for multi-arch)
# docker buildx create --name mybuilder --use --bootstrap

Write-Host "Building xheize-cc Docker image for linux/amd64 and linux/arm64..."

# Build command using buildx
# Note: --load loads the image to local docker (only works for single arch usually), 
# so for multi-arch we usually push to registry or just build.
# Here we will try to build both but might need to push to a registry or save to tar.
# For local development/testing, we usually build just the local arch.
# But per user request "linux/arm64 랑 linux/amd64", we use --platform.

# Since we likely can't push to a real registry without auth, we will demonstrate the command.
# If you want to load it locally, you can only pick one architecture at a time with --load.

Write-Host "Note: To load the image into your local Docker, remove '--platform ...' and use just your current arch, or use '--load'."
Write-Host "Building for multiple platforms requires pushing to a registry (--push) or exporting to files."

# Attempting a build that outputs to local cache (without push) to verify it works
docker buildx build --platform linux/amd64,linux/arm64 -t xheize-cc:latest .

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!"
} else {
    Write-Error "Build failed."
}
