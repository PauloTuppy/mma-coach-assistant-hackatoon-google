#!/bin/bash

# Script básico para compilar Protocol Buffers
# Gera apenas descritores e validação

# Configurar PATH para protoc
export PATH="/c/Users/paulo/Downloads/mma-coach-assistant/tools/bin:$PATH"

echo "🚀 Compilando Protocol Buffers (Básico)..."
echo ""

# Criar diretórios de saída
mkdir -p generated/descriptors

# Entrar no diretório protos
cd protos

echo "📋 Validando e compilando arquivos .proto..."

# Compilar todos os arquivos para descriptor sets
protoc --proto_path=. \
    --descriptor_set_out=../generated/descriptors/all_services.desc \
    --include_imports \
    --include_source_info \
    *.proto

if [ $? -eq 0 ]; then
    echo "✅ Compilação básica concluída com sucesso!"
    echo ""
    echo "📁 Arquivos gerados:"
    echo "  - generated/descriptors/all_services.desc"
    echo ""
    echo "📊 Estatísticas dos arquivos .proto:"
    echo "  Total de arquivos: $(ls -1 *.proto | wc -l)"
    echo "  Tamanho do descriptor: $(ls -lh ../generated/descriptors/all_services.desc | awk '{print $5}')"
    echo ""
    echo "🎯 Os Protocol Buffers foram validados e compilados com sucesso!"
    echo "   Você pode usar o arquivo descriptor para gerar código em qualquer linguagem."
else
    echo "❌ Erro na compilação"
    exit 1
fi

cd ..
