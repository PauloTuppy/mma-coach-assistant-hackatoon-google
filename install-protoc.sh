#!/bin/bash

# Script para instalar Protocol Buffer Compiler no Windows

echo "Instalando Protocol Buffer Compiler..."

# Criar diretório para ferramentas
mkdir -p tools
cd tools

# Baixar protoc para Windows
PROTOC_VERSION="25.1"
PROTOC_ZIP="protoc-${PROTOC_VERSION}-win64.zip"
PROTOC_URL="https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/${PROTOC_ZIP}"

echo "Baixando protoc ${PROTOC_VERSION}..."
curl -LO ${PROTOC_URL}

# Extrair
echo "Extraindo protoc..."
unzip -o ${PROTOC_ZIP}

# Adicionar ao PATH temporariamente
export PATH="$PWD/bin:$PATH"

# Verificar instalação
echo "Verificando instalação..."
./bin/protoc --version

echo ""
echo "✅ Protocol Buffer Compiler instalado com sucesso!"
echo ""
echo "Para usar o protoc, execute:"
echo "export PATH=\"$(pwd)/bin:\$PATH\""
echo ""
echo "Ou adicione $(pwd)/bin ao seu PATH permanentemente."

cd ..
