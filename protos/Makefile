# Makefile for compiling Protocol Buffers
# MMA Coach Assistant - Microservices

# Directories
PROTO_DIR = .
GO_OUT_DIR = ../generated/go
CSHARP_OUT_DIR = ../generated/csharp
JS_OUT_DIR = ../generated/js
PYTHON_OUT_DIR = ../generated/python
JAVA_OUT_DIR = ../generated/java

# Proto files
PROTO_FILES = $(wildcard *.proto)

# Default target
.PHONY: all
all: go csharp nodejs python java

# Create output directories
.PHONY: dirs
dirs:
	mkdir -p $(GO_OUT_DIR)
	mkdir -p $(CSHARP_OUT_DIR)
	mkdir -p $(JS_OUT_DIR)
	mkdir -p $(PYTHON_OUT_DIR)
	mkdir -p $(JAVA_OUT_DIR)

# Compile for Go
.PHONY: go
go: dirs
	@echo "Compiling Protocol Buffers for Go..."
	protoc --proto_path=$(PROTO_DIR) \
		--go_out=$(GO_OUT_DIR) \
		--go_opt=paths=source_relative \
		--go-grpc_out=$(GO_OUT_DIR) \
		--go-grpc_opt=paths=source_relative \
		$(PROTO_FILES)

# Compile for C#
.PHONY: csharp
csharp: dirs
	@echo "Compiling Protocol Buffers for C#..."
	protoc --proto_path=$(PROTO_DIR) \
		--csharp_out=$(CSHARP_OUT_DIR) \
		--grpc_out=$(CSHARP_OUT_DIR) \
		--plugin=protoc-gen-grpc=grpc_csharp_plugin \
		$(PROTO_FILES)

# Compile for Node.js
.PHONY: nodejs
nodejs: dirs
	@echo "Compiling Protocol Buffers for Node.js..."
	protoc --proto_path=$(PROTO_DIR) \
		--js_out=import_style=commonjs:$(JS_OUT_DIR) \
		--grpc_out=grpc_js:$(JS_OUT_DIR) \
		$(PROTO_FILES)

# Compile for Python
.PHONY: python
python: dirs
	@echo "Compiling Protocol Buffers for Python..."
	python -m grpc_tools.protoc --proto_path=$(PROTO_DIR) \
		--python_out=$(PYTHON_OUT_DIR) \
		--grpc_python_out=$(PYTHON_OUT_DIR) \
		$(PROTO_FILES)

# Compile for Java
.PHONY: java
java: dirs
	@echo "Compiling Protocol Buffers for Java..."
	protoc --proto_path=$(PROTO_DIR) \
		--java_out=$(JAVA_OUT_DIR) \
		--grpc-java_out=$(JAVA_OUT_DIR) \
		$(PROTO_FILES)

# Clean generated files
.PHONY: clean
clean:
	@echo "Cleaning generated files..."
	rm -rf ../generated

# Install dependencies
.PHONY: install-deps
install-deps:
	@echo "Installing Protocol Buffer dependencies..."
	# For Ubuntu/Debian
	# sudo apt-get update && sudo apt-get install -y protobuf-compiler
	# For macOS
	# brew install protobuf
	# For Go
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	# For Python
	pip install grpcio-tools
	# For Node.js
	npm install -g grpc-tools

# Validate proto files
.PHONY: validate
validate:
	@echo "Validating Protocol Buffer files..."
	@for file in $(PROTO_FILES); do \
		echo "Validating $$file..."; \
		protoc --proto_path=$(PROTO_DIR) --descriptor_set_out=/dev/null $$file; \
	done
	@echo "All proto files are valid!"

# Help
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  all        - Compile for all languages"
	@echo "  go         - Compile for Go"
	@echo "  csharp     - Compile for C#"
	@echo "  nodejs     - Compile for Node.js"
	@echo "  python     - Compile for Python"
	@echo "  java       - Compile for Java"
	@echo "  clean      - Remove generated files"
	@echo "  validate   - Validate proto files"
	@echo "  install-deps - Install required dependencies"
	@echo "  help       - Show this help message"
