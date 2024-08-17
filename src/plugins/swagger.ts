import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifyScalar from "@scalar/fastify-api-reference";
import type { FastifyInstance } from "fastify";
import taskRoutes from "../routes/taskRoutes.js";
import userRoutes from "../routes/userRoutes.js";

export default fp(async (app: FastifyInstance) => {
	await app.register(fastifySwagger, {
		mode: "dynamic",
		openapi: {
			openapi: "3.1.0",
			info: {
				title: "Task Manager API",
				version: "1.0.0",
				description: "API para gerenciamento de tarefas",
			},
			tags: [
				{
					name: "Tasks",
					description: "Operações relacionadas ao gerenciamento de tarefas.",
				},
				{
					name: "Users",
					description: "Operações relacionadas ao gerenciamento de usuários.",
				},
			],
		},
	});

	await app.register(fastifyScalar, { routePrefix: "/docs" });
	await app.register(taskRoutes);
	await app.register(userRoutes);
});
