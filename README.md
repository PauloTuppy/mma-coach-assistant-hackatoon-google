# 🥊 MMA Coach Assistant - Hackathon Google

<div align="center">
<img width="1200" height="475" alt="MMA Coach Assistant Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

Um assistente de IA para treinamento de MMA com loja de merchandise integrada, desenvolvido para o Hackathon Google usando Gemini AI.

## 🚀 Funcionalidades

- **🎥 Análise de Vídeos de Luta**: Upload e análise de vídeos usando Gemini AI
- **📊 Métricas de Performance**: Precisão de golpes, takedowns, insights de treinamento
- **📅 Cronograma de Treino**: Geração automática de planos de treino personalizados
- **🛍️ Loja Integrada**: Sistema completo de e-commerce com carrinho e checkout
- **🤖 Recomendações IA**: Sugestões de produtos baseadas em imagens e contexto
- **🏗️ Arquitetura de Microserviços**: Protocol Buffers e gRPC para escalabilidade

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **IA**: Google Gemini 2.5 Flash
- **Backend**: Microserviços com Protocol Buffers
- **Deployment**: Google Cloud Platform + Kubernetes

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (v18+)
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/PauloTuppy/mma-coach-assistant-hackatoon-google.git
cd mma-coach-assistant-hackatoon-google
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
# Edite .env.local e adicione sua GEMINI_API_KEY
```

### 4. Execute o projeto
```bash
npm run dev
```

Acesse: http://localhost:5173

## 🏗️ Arquitetura de Microserviços

O projeto implementa uma arquitetura completa de microserviços com Protocol Buffers:

| Serviço | Linguagem | Descrição |
|---------|-----------|-----------|
| **frontend** | Go | Servidor HTTP para o website |
| **cartservice** | C# | Gerenciamento do carrinho (Redis) |
| **productcatalogservice** | Go | Catálogo de produtos |
| **currencyservice** | Node.js | Conversão de moedas |
| **paymentservice** | Node.js | Processamento de pagamentos |
| **shippingservice** | Go | Cálculo de envios |
| **emailservice** | Python | Envio de emails |
| **checkoutservice** | Go | Orquestração do checkout |
| **recommendationservice** | Python | Sistema de recomendações |
| **adservice** | Java | Serviço de anúncios |
| **loadgenerator** | Python/Locust | Testes de carga |

### 📁 Estrutura do Projeto

```
mma-coach-assistant/
├── components/           # Componentes React
├── pages/               # Páginas da aplicação
├── services/            # Serviços de integração com APIs
├── protos/              # Protocol Buffer definitions
│   ├── *.proto         # Definições dos serviços
│   ├── README.md       # Documentação dos serviços
│   └── Makefile        # Scripts de compilação
├── generated/           # Código gerado dos Protocol Buffers
├── tools/              # Ferramentas (protoc, etc.)
└── docs/               # Documentação
```

## 🔧 Compilação dos Protocol Buffers

```bash
# Compilação básica (validação + descriptor)
./compile-basic.sh

# Compilação para linguagens específicas
cd protos
make go      # Para Go
make python  # Para Python
make nodejs  # Para Node.js
make java    # Para Java
make csharp  # Para C#
```

## 🚀 Deploy no Google Cloud Run

### Opção 1: Deploy Automático (Google Cloud Shell)
```bash
# 1. Abra o Google Cloud Shell
# https://console.cloud.google.com/cloudshell

# 2. Clone o repositório
git clone https://github.com/PauloTuppy/mma-coach-assistant-hackatoon-google.git
cd mma-coach-assistant-hackatoon-google

# 3. Configure sua API Key do Gemini
export GEMINI_API_KEY="sua_api_key_aqui"

# 4. Execute o deploy
chmod +x deploy-cloudshell.sh
./deploy-cloudshell.sh
```

### Opção 2: Deploy Manual
```bash
# Configure o projeto
gcloud config set project mma-coach-assistant

# Habilite as APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# Build e deploy
gcloud builds submit --tag gcr.io/mma-coach-assistant/mma-coach-assistant
gcloud run deploy mma-coach-assistant \
  --image gcr.io/mma-coach-assistant/mma-coach-assistant \
  --platform managed --region us-central1 --allow-unauthenticated
```

📖 **Guia Completo**: [CLOUD_RUN_DEPLOYMENT.md](CLOUD_RUN_DEPLOYMENT.md)

## 🎯 Funcionalidades Principais

### 🎥 Coach Assistant
- Upload de vídeos de luta
- Análise automática com Gemini AI
- Métricas de performance
- Geração de cronograma de treino

### 🛍️ Loja de Merchandise
- Catálogo de produtos
- Carrinho de compras
- Sistema de checkout
- Recomendações por IA

### 🤖 IA Integrada
- Análise de vídeos de luta
- Recomendações de produtos por imagem
- Geração de insights de treinamento
- Cronogramas personalizados

## 📚 Documentação

- [Guia de Compilação](COMPILATION_GUIDE.md)
- [Protocol Buffers](protos/README.md)
- [Arquitetura de Microserviços](docs/architecture.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🏆 Hackathon Google

Projeto desenvolvido para o Hackathon Google, demonstrando o poder da IA Gemini em aplicações práticas de esportes e e-commerce.

---

**Desenvolvido com ❤️ por Paulo Tuppy para o Hackathon Google**
