const fastify = require('fastify')({ logger: true });

const DEAFULT_STATUS = "passed";
let status = DEAFULT_STATUS;
let lastChange = Date.now();

// Route zum Setzen des Status (per Query-Parameter)
fastify.get('/', async (request, reply) => {
  const newStatus = request.query.status; // Status aus Query-Parameter
  if (newStatus === "on" || newStatus === "off" || newStatus === DEAFULT_STATUS) {
    status = newStatus;
    reply.send({ message: `Status erfolgreich gesetzt auf '${status}'` });
  } else if (newStatus === "info") {
    reply.send({ status, lastChange: parseInt((Date.now()-new Date(lastChange)) / 1000) });
  } else {
    reply.send({ status });
    status = DEAFULT_STATUS;
    lastChange = Date.now();
  }
});


// Starten des Servers
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log("Server läuft auf http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
