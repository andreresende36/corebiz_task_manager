import type { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { Type } from "@sinclair/typebox";
import taskServices from "../services/taskServices.js";
import {
	CreateTaskBody,
	IdSchema,
	TaskSchema,
	UpdateTaskBody,
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
				description: "Recupera uma lista de todas as tarefas.",
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
				description: "Recupera uma tarefa específica pelo seu ID.",
				response: { "2xx": TaskSchema },
				params: IdSchema,
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
				description: "Cria uma nova tarefa.",
				response: { "2xx": CreateTaskResponse },
				body: CreateTaskBody,
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
				description: "Atualiza uma tarefa existente pelo seu ID.",
				response: { "2xx": Type.Object({ message: Type.String() }) },
				body: UpdateTaskBody,
				params: IdSchema,
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
				description: "Exclui uma tarefa pelo seu ID (soft delete).",
				response: { "2xx": Type.Object({ message: Type.String() }) },
				params: IdSchema,
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
