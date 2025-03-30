const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    try {
        const client = new CosmosClient(process.env.CosmosDBConnection);
        const container = client.database("stressopsdb").container("registros");

        const querySpec = { query: "SELECT * FROM c ORDER BY c.timestamp DESC" };
        const { resources: items } = await container.items.query(querySpec).fetchAll();

        context.res = { status: 200, body: items };
    } catch (err) {
        context.res = { status: 500, body: "Erro interno: " + err.message };
    }
};