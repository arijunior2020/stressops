const { CosmosClient } = require("@azure/cosmos");
const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, req) {
    try {
        const { deploys, erros, tempoResposta } = req.body;

        const score = deploys * 2 + erros * 5 + tempoResposta / 60;
        let nivel = "", emoji = "", mensagem = "";

        if (score < 50) {
            nivel = "Zen"; emoji = "🧘‍♂️🌿"; mensagem = "Você é uma lenda da estabilidade.";
        } else if (score < 100) {
            nivel = "Suado"; emoji = "😅🚧"; mensagem = "Tá puxado, mas ainda sob controle.";
        } else if (score < 200) {
            nivel = "Caótico"; emoji = "🔥💣"; mensagem = "Deploy em sexta-feira? Corajoso.";
        } else {
            nivel = "Sobrevivência"; emoji = "☠️🪦"; mensagem = "Já pensou em abrir uma cafeteria?";
        }

        const client = new CosmosClient(process.env.CosmosDBConnection);
        const container = client.database("stressopsdb").container("registros");

        const item = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            deploys, erros, tempoResposta, score, nivel, emoji, mensagem
        };

        await container.items.create(item);
        context.res = { status: 201, body: item };
    } catch (err) {
        context.res = { status: 500, body: "Erro interno: " + err.message };
    }
};