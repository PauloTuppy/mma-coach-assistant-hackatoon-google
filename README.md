# 🥊 MMA Coach Assistant - Google Hackathon

[![Deploy](https://img.shields.io/badge/Deploy-Google%20Cloud%20Run-blue?logo=googlecloud)](https://console.cloud.google.com/run?project=mma-coach-assistant)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange?logo=google)](https://ai.google.dev/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61dafb?logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Hackathon](https://img.shields.io/badge/Hackathon-Google%20AI%20Studio-red?logo=google)](https://aistudio.google.com/)

An AI-powered MMA training assistant with integrated merchandise store, built for the **Google Hackathon** using **Google Gemini AI**.

## 🚀 Features

- **🎥 Fight Video Analysis**: Upload and analyze fight footage using **Gemini AI**
- **📊 Performance Metrics**: Strike accuracy, takedown detection, and AI-driven training insights
- **📅 Custom Training Plans**: AI-generated personalized training schedules
- **🛍️ Integrated Store**: Full e-commerce system with cart and checkout
- **🤖 AI Product Recommendations**: Smart product suggestions based on images and context
- **🏗️ Microservices Architecture**: Scalable backend using Protocol Buffers and gRPC

## 🛠️ Technologies

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **AI**: Google Gemini 2.5 Flash (multimodal video & image understanding)
- **Backend**: Microservices with gRPC and Protocol Buffers
- **Deployment**: Google Cloud Platform (GCP) + Cloud Run + Kubernetes

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/PauloTuppy/mma-coach-assistant-hackatoon-google.git
cd mma-coach-assistant-hackatoon-google
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your Gemini API key:
```env
VITE_GEMINI_KEY=your_gemini_api_key_here
```

### 4. Run the App Locally
```bash
npm run dev
```
👉 Open: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Microservices Architecture

The project implements a full microservices architecture using **Protocol Buffers** and **gRPC**.

| Service | Language | Description |
|--------|---------|-------------|
| `frontend` | Go | HTTP server for the web frontend |
| `cartservice` | C# | Shopping cart management (Redis) |
| `productcatalogservice` | Go | Product catalog service |
| `currencyservice` | Node.js | Currency conversion |
| `paymentservice` | Node.js | Payment processing (mock) |
| `shippingservice` | Go | Shipping cost calculation |
| `emailservice` | Python | Order confirmation emails |
| `checkoutservice` | Go | Orchestrates checkout flow |
| `recommendationservice` | Python | AI-powered product recommendations |
| `adservice` | Java | Text ad generation |
| `loadgenerator` | Python/Locust | Simulates user traffic |

## 📁 Project Structure

```
mma-coach-assistant/
├── components/           # React UI components
├── pages/                # Application pages
├── services/             # API integration services
├── protos/               # Protocol Buffer definitions
│   ├── *.proto           # gRPC service definitions
│   ├── README.md         # Service documentation
│   └── Makefile          # Compilation scripts
├── generated/            # Auto-generated gRPC code
├── tools/                # Tools (protoc, etc.)
└── docs/                 # Project documentation
```

## 🔧 Compile Protocol Buffers

### Basic Compilation (Validation + Descriptor)
```bash
./compile-basic.sh
```

### Generate Code for Specific Languages
```bash
cd protos
make go      # Go
make python  # Python
make nodejs  # Node.js
make java    # Java
make csharp  # C#
```

## 🚀 Deploy to Google Cloud Run

### Option 1: Automated Deploy (Google Cloud Shell)

1. Open [Google Cloud Shell](https://console.cloud.google.com/cloudshell)
2. Clone the repo:
   ```bash
   git clone https://github.com/PauloTuppy/mma-coach-assistant-hackatoon-google.git
   cd mma-coach-assistant-hackatoon-google
   ```
3. Set your Gemini API key:
   ```bash
   export GEMINI_API_KEY="your_api_key_here"
   ```
4. Run the deploy script:
   ```bash
   chmod +x deploy-cloudshell.sh
   ./deploy-cloudshell.sh
   ```

### Option 2: Manual Deploy

```bash
# Set your GCP project
gcloud config set project mma-coach-assistant

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# Build and deploy
gcloud builds submit --tag gcr.io/mma-coach-assistant/mma-coach-assistant
gcloud run deploy mma-coach-assistant \
  --image gcr.io/mma-coach-assistant/mma-coach-assistant \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

📘 **Full Guide**: [CLOUD_RUN_DEPLOYMENT.md](CLOUD_RUN_DEPLOYMENT.md)

---

## 🎯 Key Features

### 🎥 Coach Assistant
- Upload fight videos
- AI-powered analysis with **Gemini**
- Performance metrics (strikes, takedowns, movement)
- Generate personalized training schedules

### 🛍️ Merchandise Store
- Product catalog
- Shopping cart
- Secure checkout
- AI-powered recommendations

### 🤖 Integrated AI
- Video analysis for fight strategy
- Image-based product recommendations
- Training insights and drills
- Custom training plans

---

## 📚 Documentation

- [COMPILATION_GUIDE.md](COMPILATION_GUIDE.md) – How to compile Protocol Buffers
- [CLOUD_RUN_DEPLOYMENT.md](CLOUD_RUN_DEPLOYMENT.md) – Full Cloud Run deployment guide
- [protos/README.md](protos/README.md) – Microservices API documentation

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🏆 Google Hackathon

Built for the **Google AI Studio Multimodal Challenge**, showcasing the power of **Gemini AI** in real-world sports and e-commerce applications.

💻 Developed with ❤️ by **Paulo Tuppy** for the Google Hackathon

---
