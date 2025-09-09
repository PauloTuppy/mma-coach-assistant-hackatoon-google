# 🚀 Deploy MMA Coach Assistant no Google Cloud Run

## 📋 Pré-requisitos

1. **Conta Google Cloud** com projeto `mma-coach-assistant` criado
2. **Billing habilitado** no projeto
3. **APIs necessárias** habilitadas (o script fará isso automaticamente)

## 🎯 Opção 1: Deploy via Google Cloud Shell (Recomendado)

### 1. Abra o Google Cloud Shell
Acesse: https://console.cloud.google.com/cloudshell

### 2. Clone o repositório
```bash
git clone https://github.com/PauloTuppy/mma-coach-assistant-hackatoon-google.git
cd mma-coach-assistant-hackatoon-google
```

### 3. Configure a API Key do Gemini
```bash
# Substitua YOUR_GEMINI_API_KEY pela sua chave real
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

### 4. Execute o script de deploy
```bash
chmod +x deploy-cloud-run.sh
./deploy-cloud-run.sh
```

## 🛠️ Opção 2: Deploy Manual

### 1. Configure o projeto
```bash
gcloud config set project mma-coach-assistant
```

### 2. Habilite as APIs necessárias
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 3. Build e push da imagem
```bash
gcloud builds submit --tag gcr.io/mma-coach-assistant/mma-coach-assistant
```

### 4. Deploy no Cloud Run
```bash
gcloud run deploy mma-coach-assistant \
    --image gcr.io/mma-coach-assistant/mma-coach-assistant \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300 \
    --concurrency 80 \
    --set-env-vars NODE_ENV=production,PORT=8080
```

### 5. Configure a API Key como Secret (Recomendado)
```bash
# Criar secret
echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets create gemini-api-key --data-file=-

# Atualizar o serviço para usar o secret
gcloud run services update mma-coach-assistant \
    --region us-central1 \
    --set-secrets GEMINI_API_KEY=gemini-api-key:latest
```

## 🎯 Opção 3: Deploy via Console Web

### 1. Acesse o Google Cloud Console
https://console.cloud.google.com/run?project=mma-coach-assistant

### 2. Clique em "CREATE SERVICE"

### 3. Configure o serviço:
- **Container Image URL**: `gcr.io/mma-coach-assistant/mma-coach-assistant:latest`
- **Service name**: `mma-coach-assistant`
- **Region**: `us-central1`
- **Authentication**: Allow unauthenticated invocations
- **Port**: `8080`
- **Memory**: `512 MiB`
- **CPU**: `1`
- **Minimum instances**: `0`
- **Maximum instances**: `10`
- **Request timeout**: `300`
- **Maximum concurrent requests**: `80`

### 4. Adicione variáveis de ambiente:
- `NODE_ENV`: `production`
- `PORT`: `8080`
- `GEMINI_API_KEY`: `[SUA_API_KEY_AQUI]`

## 📊 Verificação do Deploy

Após o deploy, você receberá uma URL similar a:
```
https://mma-coach-assistant-[hash]-uc.a.run.app
```

### Teste os endpoints:
- **Health Check**: `https://[URL]/health`
- **Aplicação**: `https://[URL]/`

## 🔧 Configurações Avançadas

### Monitoramento
```bash
# Ver logs
gcloud run services logs read mma-coach-assistant --region=us-central1

# Ver métricas
gcloud run services describe mma-coach-assistant --region=us-central1
```

### Atualizações
```bash
# Para atualizar, execute novamente:
./deploy-cloud-run.sh
```

### Rollback
```bash
# Listar revisões
gcloud run revisions list --service=mma-coach-assistant --region=us-central1

# Fazer rollback para revisão anterior
gcloud run services update-traffic mma-coach-assistant \
    --to-revisions=[REVISION_NAME]=100 \
    --region=us-central1
```

## 🛡️ Segurança

### 1. Use Secrets para API Keys
```bash
# Criar secret
gcloud secrets create gemini-api-key --data-file=-

# Usar no Cloud Run
gcloud run services update mma-coach-assistant \
    --set-secrets GEMINI_API_KEY=gemini-api-key:latest \
    --region=us-central1
```

### 2. Configure IAM adequadamente
```bash
# Remover acesso público (se necessário)
gcloud run services remove-iam-policy-binding mma-coach-assistant \
    --member="allUsers" \
    --role="roles/run.invoker" \
    --region=us-central1
```

## 💰 Custos Estimados

Com as configurações padrão:
- **Requests**: Primeiros 2 milhões/mês são gratuitos
- **CPU/Memory**: ~$0.000024 por vCPU-segundo
- **Memory**: ~$0.0000025 por GiB-segundo

Para um site com tráfego moderado: **~$5-20/mês**

## 🐛 Troubleshooting

### Erro: "Service not found"
```bash
gcloud config set project mma-coach-assistant
```

### Erro: "Permission denied"
```bash
gcloud auth login
gcloud auth application-default login
```

### Erro: "Build failed"
Verifique se o Dockerfile está correto e se todas as dependências estão no package.json.

### Erro: "Container failed to start"
Verifique os logs:
```bash
gcloud run services logs read mma-coach-assistant --region=us-central1
```

## 🎉 Sucesso!

Após o deploy bem-sucedido, sua aplicação MMA Coach Assistant estará rodando no Google Cloud Run com:

- ✅ Auto-scaling (0-10 instâncias)
- ✅ HTTPS automático
- ✅ Health checks
- ✅ Logs centralizados
- ✅ Monitoramento integrado
- ✅ 99.95% SLA

**URL da aplicação**: Será fornecida após o deploy!
