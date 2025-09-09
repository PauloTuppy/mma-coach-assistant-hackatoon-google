# MMA Coach Assistant - Protocol Buffers

Este diretório contém as definições de Protocol Buffers para todos os serviços da arquitetura de microserviços do MMA Coach Assistant.

## Estrutura dos Serviços

| Serviço | Linguagem | Descrição |
|---------|-----------|-----------|
| **frontend** | Go | Expõe um servidor HTTP para servir o website. Não requer signup/login e gera IDs de sessão automaticamente |
| **cartservice** | C# | Armazena itens do carrinho de compras do usuário no Redis e os recupera |
| **productcatalogservice** | Go | Fornece lista de produtos de um arquivo JSON e capacidade de buscar produtos |
| **currencyservice** | Node.js | Converte valores monetários entre moedas. Usa valores reais do Banco Central Europeu |
| **paymentservice** | Node.js | Processa pagamentos com cartão de crédito (mock) e retorna ID da transação |
| **shippingservice** | Go | Fornece estimativas de custo de envio baseadas no carrinho de compras |
| **emailservice** | Python | Envia emails de confirmação de pedido aos usuários (mock) |
| **checkoutservice** | Go | Recupera carrinho do usuário, prepara pedido e orquestra pagamento, envio e notificação |
| **recommendationservice** | Python | Recomenda outros produtos baseados no que está no carrinho |
| **adservice** | Java | Fornece anúncios de texto baseados em palavras-chave de contexto |
| **loadgenerator** | Python/Locust | Envia requisições continuamente imitando fluxos realistas de compra |

## Arquivos Protocol Buffer

### Tipos Comuns
- **`common.proto`** - Tipos de dados compartilhados entre todos os serviços (Money, Address, Product, etc.)

### Serviços
- **`frontend.proto`** - Interface do frontend web
- **`cartservice.proto`** - Gerenciamento do carrinho de compras
- **`productcatalogservice.proto`** - Catálogo de produtos
- **`currencyservice.proto`** - Conversão de moedas
- **`paymentservice.proto`** - Processamento de pagamentos
- **`shippingservice.proto`** - Cálculo e rastreamento de envios
- **`emailservice.proto`** - Envio de emails
- **`checkoutservice.proto`** - Processo de checkout
- **`recommendationservice.proto`** - Sistema de recomendações
- **`adservice.proto`** - Serviço de anúncios
- **`loadgenerator.proto`** - Gerador de carga para testes

## Compilação

Para compilar os Protocol Buffers para diferentes linguagens:

### Go
```bash
protoc --go_out=. --go-grpc_out=. protos/*.proto
```

### C#
```bash
protoc --csharp_out=. --grpc_out=. --plugin=protoc-gen-grpc=grpc_csharp_plugin protos/*.proto
```

### Node.js
```bash
protoc --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. protos/*.proto
```

### Python
```bash
python -m grpc_tools.protoc --python_out=. --grpc_python_out=. protos/*.proto
```

### Java
```bash
protoc --java_out=. --grpc-java_out=. protos/*.proto
```

## Uso no Projeto

Estes Protocol Buffers definem as interfaces de comunicação entre os microserviços. Cada serviço implementa as interfaces definidas em seu respectivo arquivo `.proto`.

### Exemplo de Uso (Go)
```go
import (
    pb "github.com/mma-coach-assistant/protos/productcatalogservice"
)

// Implementar o serviço
type productCatalogService struct {
    pb.UnimplementedProductCatalogServiceServer
}

func (s *productCatalogService) ListProducts(ctx context.Context, req *pb.Empty) (*pb.ListProductsResponse, error) {
    // Implementação
}
```

### Exemplo de Uso (Node.js)
```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('protos/currencyservice.proto');
const currencyProto = grpc.loadPackageDefinition(packageDefinition).mmacoach.currencyservice;
```

## Configuração do Projeto Google Cloud

Para usar com Google Kubernetes Engine (GKE):

```bash
export PROJECT_ID=mma-coach-assistant
export REGION=us-central1

# Habilitar APIs necessárias
gcloud services enable container.googleapis.com --project=${PROJECT_ID}

# Criar cluster GKE
gcloud container clusters create-auto mma-coach-cluster \
  --project=${PROJECT_ID} --region=${REGION}
```

## Notas de Implementação

- Todos os serviços usam gRPC para comunicação inter-serviços
- O frontend expõe uma API HTTP/REST para o cliente web
- Os tipos comuns em `common.proto` garantem consistência entre serviços
- Cada serviço tem opções específicas da linguagem configuradas
- Os serviços são projetados para serem stateless e escaláveis horizontalmente
