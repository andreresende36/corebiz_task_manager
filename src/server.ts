import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger.js";
import "dotenv/config";

const server = Fastify({
	logger: true,
});

server.register(swaggerPlugin);

server.get("/", async (_request, _reply) => {
	return { message: "Seja bem-vindo!" };
});

server.listen({ host: process.env.HOST, port: 3000 }, (err) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
});
