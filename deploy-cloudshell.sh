#!/bin/bash

# Deploy MMA Coach Assistant to Google Cloud Run
# Optimized for Google Cloud Shell

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="mma-coach-assistant"
SERVICE_NAME="mma-coach-assistant"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo -e "${BLUE}🚀 MMA Coach Assistant - Google Cloud Run Deployment${NC}"
echo -e "${BLUE}====================================================${NC}"
echo ""
echo -e "Project: ${YELLOW}${PROJECT_ID}${NC}"
echo -e "Service: ${YELLOW}${SERVICE_NAME}${NC}"
echo -e "Region: ${YELLOW}${REGION}${NC}"
echo -e "Image: ${YELLOW}${IMAGE_NAME}${NC}"
echo ""

# Check if we're in Cloud Shell
if [[ -n "$CLOUD_SHELL" ]]; then
    echo -e "${GREEN}✅ Running in Google Cloud Shell${NC}"
else
    echo -e "${YELLOW}⚠️  Not running in Cloud Shell. Make sure gcloud is configured.${NC}"
fi

# Set the project
echo -e "${BLUE}📋 Setting Google Cloud project...${NC}"
gcloud config set project ${PROJECT_ID}

# Check if project exists
if ! gcloud projects describe ${PROJECT_ID} &>/dev/null; then
    echo -e "${RED}❌ Project ${PROJECT_ID} not found or not accessible.${NC}"
    echo -e "${YELLOW}Please make sure:${NC}"
    echo -e "  1. The project exists"
    echo -e "  2. You have access to it"
    echo -e "  3. Billing is enabled"
    exit 1
fi

echo -e "${GREEN}✅ Project ${PROJECT_ID} is accessible${NC}"

# Enable required APIs
echo -e "${BLUE}🔧 Enabling required Google Cloud APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com --quiet
gcloud services enable run.googleapis.com --quiet
gcloud services enable containerregistry.googleapis.com --quiet

echo -e "${GREEN}✅ APIs enabled successfully${NC}"

# Check for GEMINI_API_KEY
if [[ -z "$GEMINI_API_KEY" ]]; then
    echo -e "${YELLOW}⚠️  GEMINI_API_KEY environment variable not set${NC}"
    echo -e "${YELLOW}The application will deploy but won't work without the API key.${NC}"
    echo ""
    echo -e "${BLUE}To set it, run:${NC}"
    echo -e "${YELLOW}export GEMINI_API_KEY=\"your_api_key_here\"${NC}"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✅ GEMINI_API_KEY is set${NC}"
fi

# Build and push the Docker image
echo -e "${BLUE}🏗️  Building Docker image...${NC}"
echo -e "${YELLOW}This may take a few minutes...${NC}"

if gcloud builds submit --tag ${IMAGE_NAME} --quiet; then
    echo -e "${GREEN}✅ Docker image built and pushed successfully${NC}"
else
    echo -e "${RED}❌ Failed to build Docker image${NC}"
    exit 1
fi

# Prepare environment variables
ENV_VARS="NODE_ENV=production,PORT=8080"
if [[ -n "$GEMINI_API_KEY" ]]; then
    ENV_VARS="${ENV_VARS},GEMINI_API_KEY=${GEMINI_API_KEY}"
fi

# Deploy to Cloud Run
echo -e "${BLUE}🚀 Deploying to Cloud Run...${NC}"

if gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME} \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300 \
    --concurrency 80 \
    --set-env-vars ${ENV_VARS} \
    --quiet; then
    
    echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

# Get the service URL
echo -e "${BLUE}🔍 Getting service URL...${NC}"
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region=${REGION} --format='value(status.url)')

echo ""
echo -e "${GREEN}🎉 SUCCESS! Your MMA Coach Assistant is now live!${NC}"
echo -e "${GREEN}=================================================${NC}"
echo ""
echo -e "${BLUE}📱 Application URL:${NC}"
echo -e "${GREEN}🔗 ${SERVICE_URL}${NC}"
echo ""
echo -e "${BLUE}🔍 Health Check:${NC}"
echo -e "${GREEN}🔗 ${SERVICE_URL}/health${NC}"
echo ""
echo -e "${BLUE}📊 Service Management:${NC}"
echo -e "🔗 https://console.cloud.google.com/run/detail/${REGION}/${SERVICE_NAME}?project=${PROJECT_ID}"
echo ""
echo -e "${BLUE}📋 Useful Commands:${NC}"
echo -e "${YELLOW}# View logs${NC}"
echo -e "gcloud run services logs read ${SERVICE_NAME} --region=${REGION}"
echo ""
echo -e "${YELLOW}# Update service${NC}"
echo -e "./deploy-cloudshell.sh"
echo ""
echo -e "${YELLOW}# Delete service${NC}"
echo -e "gcloud run services delete ${SERVICE_NAME} --region=${REGION}"
echo ""

# Test the health endpoint
echo -e "${BLUE}🧪 Testing health endpoint...${NC}"
if curl -s "${SERVICE_URL}/health" > /dev/null; then
    echo -e "${GREEN}✅ Health check passed!${NC}"
else
    echo -e "${YELLOW}⚠️  Health check failed, but service might still be starting...${NC}"
fi

echo ""
echo -e "${GREEN}🎯 Deployment completed! Your MMA Coach Assistant is ready to use!${NC}"
