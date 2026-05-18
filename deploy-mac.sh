#!/bin/bash
set -e  # Exit on any error

# ============================================
# CHANGE THESE 3 VALUES:
# ============================================
USERNAME="catsheue"
VPS_HOST="178.128.16.199"
VPS_PORT="11233"
VPS_PATH="/srv/projects/star"
# ============================================

IMAGE_NAME="star"
FULL_IMAGE="${USERNAME}/${IMAGE_NAME}:latest"
API_URL="https://api.star.vividcats.org"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="7989124817-8vnvtqrag0fj1sa2g27slukrd16ooc2l.apps.googleusercontent.com"

echo "Step 1: Building Docker image..."
docker build --no-cache --build-arg NEXT_PUBLIC_API_URL="${API_URL}" --build-arg NEXT_PUBLIC_GOOGLE_CLIENT_ID="${NEXT_PUBLIC_GOOGLE_CLIENT_ID}" -t "${FULL_IMAGE}" .

echo "Step 2: Pushing to Docker Hub..."
docker push "${FULL_IMAGE}"

echo "Step 3: Deploying to VPS..."
ssh -p "${VPS_PORT}" "root@${VPS_HOST}" << EOF
  cd ${VPS_PATH}
  git pull
  docker compose down
  docker pull ${FULL_IMAGE}
  docker compose up -d
EOF

echo "Done!"
