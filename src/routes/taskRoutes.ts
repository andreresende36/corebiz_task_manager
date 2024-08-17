import type { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { Type } from "@sinclair/typebox";
import taskServices from "../services/taskServices.js";
import {
	TaskSchema,
	type CreateTaskBody,
	type UpdateTaskBody,
	type IdSchema,
	CreateTaskResponse,
} from "../schemas/schemas.js";

const services = new taskServices();

const routes = fp(async (scope: FastifyInstance) => {
	scope.get(
		"/tasks",
		{
			schema: {
				tags: ["Tasks"],
				operationId: "getTasks",
				response: { "2xx": Type.Array(TaskSchema) },
			},
		},
		async () => {
			const tasks = await services.getTasks();
			return tasks;
		},
	);

	scope.get(
		"/tasks/:id",
		{
			schema: {
				tags: ["Tasks"],
				operationId: "getTaskById",
				response: { "2xx": TaskSchema },
			},
		},
		async (request: FastifyRequest<{ Params: IdSchema }>) => {
			const { id } = request.params;
			const task = await services.getTaskById(id);
			return task;
		},
	);

	scope.post(
		"/tasks",
		{
			schema: {
				tags: ["Tasks"],
				operationId: "createTask",
				response: { "2xx": CreateTaskResponse },
			},
		},
		async (request: FastifyRequest<{ Body: CreateTaskBody }>) => {
			const createdTask = await services.createTask(request.body);
			return createdTask;
		},
	);

	scope.put(
		"/tasks/:id",
		{
			schema: {
				tags: ["Tasks"],
				operationId: "updateTask",
				response: { "2xx": Type.Object({ message: Type.String() }) },
			},
		},
		async (
			request: FastifyRequest<{ Params: IdSchema; Body: UpdateTaskBody }>,
		) => {
			const { id } = request.params;
			const { body } = request;
			const result = await services.updateTask(id, body);
			return result;
		},
	);

	scope.delete(
		"/tasks/:id",
		{
			schema: {
				tags: ["Tasks"],
				operationId: "deleteTask",
				response: { "2xx": Type.Object({ message: Type.String() }) },
			},
		},
		async (request: FastifyRequest<{ Params: IdSchema }>) => {
			const { id } = request.params;
			const result = await services.deleteTask(id);
			return result;
		},
	);
});

export default routes;
