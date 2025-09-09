#!/bin/bash

# Deploy MMA Coach Assistant to Google Cloud Run
# Make sure you're authenticated with gcloud and have the correct project set

set -e

# Configuration
PROJECT_ID="mma-coach-assistant"
SERVICE_NAME="mma-coach-assistant"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Deploying MMA Coach Assistant to Google Cloud Run"
echo "Project: ${PROJECT_ID}"
echo "Service: ${SERVICE_NAME}"
echo "Region: ${REGION}"
echo ""

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set the project
echo "📋 Setting Google Cloud project..."
gcloud config set project ${PROJECT_ID}

# Enable required APIs
echo "🔧 Enabling required Google Cloud APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and push the Docker image
echo "🏗️ Building Docker image..."
gcloud builds submit --tag ${IMAGE_NAME}

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
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
    --set-env-vars NODE_ENV=production,PORT=8080

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region=${REGION} --format='value(status.url)')

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📱 Your MMA Coach Assistant is now live at:"
echo "🔗 ${SERVICE_URL}"
echo ""
echo "📊 Service details:"
echo "  - Project: ${PROJECT_ID}"
echo "  - Service: ${SERVICE_NAME}"
echo "  - Region: ${REGION}"
echo "  - Image: ${IMAGE_NAME}"
echo ""
echo "🛠️ To update the service, run this script again."
echo "📋 To view logs: gcloud run services logs read ${SERVICE_NAME} --region=${REGION}"
echo "⚙️ To manage the service: https://console.cloud.google.com/run/detail/${REGION}/${SERVICE_NAME}"
