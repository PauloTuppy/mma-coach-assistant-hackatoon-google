#!/bin/bash

# Script para compilar Protocol Buffers
# MMA Coach Assistant

# Configurar PATH para protoc
export PATH="/c/Users/paulo/Downloads/mma-coach-assistant/tools/bin:$PATH"

echo "🚀 Compilando Protocol Buffers para MMA Coach Assistant..."
echo ""

# Criar diretórios de saída
echo "📁 Criando diretórios de saída..."
mkdir -p generated/{go,csharp,js,python,java}

# Entrar no diretório protos
cd protos

echo ""
echo "📋 Validando arquivos .proto..."
for file in *.proto; do
    echo "  ✓ Validando $file..."
    protoc --proto_path=. --descriptor_set_out=/dev/null "$file"
    if [ $? -ne 0 ]; then
        echo "  ❌ Erro na validação de $file"
        exit 1
    fi
done

echo ""
echo "✅ Todos os arquivos .proto são válidos!"
echo ""

# Compilar para JavaScript (mais simples, sem dependências extras)
echo "🔧 Compilando para JavaScript..."
protoc --proto_path=. \
    --js_out=import_style=commonjs:../generated/js \
    *.proto

if [ $? -eq 0 ]; then
    echo "  ✅ JavaScript: Compilação concluída com sucesso!"
else
    echo "  ❌ JavaScript: Erro na compilação"
fi

echo ""
echo "📊 Resultados da compilação:"
echo "  📁 Arquivos JavaScript gerados em: ./generated/js/"
ls -la ../generated/js/ | head -10

echo ""
echo "🎉 Compilação dos Protocol Buffers concluída!"
echo ""
echo "📖 Para compilar para outras linguagens, você precisará instalar:"
echo "  - Go: go install google.golang.org/protobuf/cmd/protoc-gen-go@latest"
echo "  - Python: pip install grpcio-tools"
echo "  - Java: Instalar protoc-gen-grpc-java"
echo "  - C#: Instalar Grpc.Tools NuGet package"

cd ..
