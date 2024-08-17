import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Type } from "@sinclair/typebox";
import taskServices from "../services/taskServices.js";
// import type { TaskType } from "../schemas/taskSchema.js";

const services = new taskServices();

const routes = fp(async (scope: FastifyInstance) => {
	scope.get(
		"/tasks/list",
		{
			schema: {
				tags: ["Tasks"],
				operationId: "getTasks",
				response: { "2xx": Type.Object({ test: Type.String() }) },
			},
		},
		async () => {
			const message = await services.getTest();
			return { test: message };
		},
	);
});

export default routes;
