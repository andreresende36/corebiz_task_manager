import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifyScalar from "@scalar/fastify-api-reference";
import type { FastifyInstance } from "fastify";

export default fp(async (app: FastifyInstance) => {
	await app.register(fastifySwagger, {
		mode: "dynamic",
		openapi: {
			openapi: "3.1.0",
			info: {
				title: "Task Manager API",
				version: "1.0.0",
			},
		},
	});

	await app.register(fastifyScalar, { routePrefix: "/reference" });
});
