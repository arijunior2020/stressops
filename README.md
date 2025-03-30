# 🚀 StressOps – DevOps Mode Caótico

Este projeto é um sistema completo (backend + frontend) para avaliação do nível de estresse de uma equipe DevOps com base em número de deploys, erros e tempo de resposta. Desenvolvido com **Azure Functions + React + Azure Container Registry + Web App for Containers**.

---

## 📁 Estrutura do Projeto (Monorepo)

```
STRESSOPS-FUNCTION/
├── StressCalculator/      # Azure Function 1 (POST)
├── StressList/            # Azure Function 2 (GET)
├── stressops-web/         # Frontend React + CSS puro
├── host.json              # Configurações da Azure Function App
├── package.json           # Dependências do projeto de funções
```

---

## 🧠 Funcionalidade

- 🔢 Cálculo do nível de estresse via função `StressCalculator`
- 📋 Listagem de registros armazenados no Azure Cosmos DB via função `StressList`
- 🌐 Interface React moderna e leve com tema Light/Dark
- 🐳 Deploy do frontend com Docker no Azure Container Registry (ACR) + Web App

---

## ⚙️ Passo a passo para replicar

### 1. **Criar os recursos no Azure**

- [ ] Grupo de Recursos (Resource Group)
- [ ] Azure Cosmos DB (API: Core SQL)
- [ ] Azure Storage Account (será criado automaticamente com a Function App)
- [ ] Azure Function App (Node.js)
- [ ] Azure Container Registry (ACR)
- [ ] Azure Web App for Containers

### 2. **Publicar o backend (Azure Functions)**

#### a) Ajustes iniciais

1. Crie os arquivos `local.settings.json` e configure os valores locais (se desejar rodar localmente)
2. Configure no portal da Function App:
   - `FUNCTIONS_WORKER_RUNTIME=node`
   - `AzureWebJobsStorage=<connection string do Storage Account>`
   - `CosmosDBConnection=<connection string do CosmosDB>`

#### b) Build e publicação

```bash
npm install
npm run build
func azure functionapp publish stressops-fn --script-root . --force
```

> 📌 Garanta que os arquivos `.js` da `dist/` ou do root estejam corretamente organizados e com `function.json` se estiver usando o modelo antigo.

---

### 3. **Buildar e publicar o frontend no ACR**

```bash
cd stressops-web
npm install
npm run build

# Build da imagem Docker
docker build -t stressops-web .

# Login no ACR
az acr login --name stressops

# Tag e push
docker tag stressops-web stressops.azurecr.io/stressops-web:1.0.0
docker push stressops.azurecr.io/stressops-web:1.0.0
```

---

### 4. **Criar o Web App for Containers no Azure**

1. Escolha a imagem do ACR manualmente:
   - **Image:** `stressops-web`
   - **Tag:** `1.0.0`
2. Use **Managed Identity** para autenticar no ACR
3. Após criar, vá até o ACR > IAM > Role Assignment e adicione a role `AcrPull` para o Web App (`stressops-webapp`)

---

## 🔐 Conexões Importantes

- `AzureWebJobsStorage`: da Storage Account criada junto da Function App
- `CosmosDBConnection`: da sua conta CosmosDB

---

## ✅ Funcionalidades prontas

- [x] Azure Function App com duas funções
- [x] Azure CosmosDB conectado
- [x] Frontend com React + CSS puro
- [x] Dockerfile pronto para build
- [x] Imagem publicada no ACR
- [x] Web App for Containers apontando para o ACR
- [x] Tema Dark/Light
- [x] Exibição do último resultado e histórico

---

## 👨‍💻 Desenvolvido pela Equipe

- **José Arimatéia Rodrigues Júnior - Matrícula 2417061**
- **Karime Oliveira - Matrícula 2417062**
- **Bruno Rodrigues - Matrícula 2417063**
- **Pedro Henrique - Matrícula 2417064**
- **Anderson Silva - Matrícula 2417065**
