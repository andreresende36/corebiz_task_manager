import type { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { Type } from "@sinclair/typebox";
import UserServices from "../services/userServices.js";
import {
	CreateUserBody,
	IdSchema,
	UpdateUserBody,
	UserSchema,
} from "../schemas/schemas.js";

const services = new UserServices();

const routes = fp(async (scope: FastifyInstance) => {
	scope.get(
		"/users",
		{
			schema: {
				tags: ["Users"],
				operationId: "getUsers",
				description: "Recupera uma lista de todos os usuários.",
				response: { "2xx": Type.Array(UserSchema) },
			},
		},
		async () => {
			const users = await services.getUsers();
			return users;
		},
	);

	scope.get(
		"/users/:id",
		{
			schema: {
				tags: ["Users"],
				operationId: "getUserById",
				description: "Recupera um usuário específico pelo seu ID.",
				response: { "2xx": UserSchema },
				params: IdSchema,
			},
		},
		async (request: FastifyRequest<{ Params: IdSchema }>) => {
			const { id } = request.params;
			const user = await services.getUserById(id);
			return user;
		},
	);

	scope.post(
		"/users",
		{
			schema: {
				tags: ["Users"],
				operationId: "createUser",
				description: "Cria um novo usuário.",
				response: { "2xx": UserSchema },
				body: CreateUserBody,
			},
		},
		async (request: FastifyRequest<{ Body: CreateUserBody }>) => {
			const createdUser = await services.createUser(request.body);
			return createdUser;
		},
	);

	scope.put(
		"/users/:id",
		{
			schema: {
				tags: ["Users"],
				operationId: "updateUser",
				description: "Atualiza um usuário existente pelo seu ID.",
				response: { "2xx": Type.Object({ message: Type.String() }) },
				body: UpdateUserBody,
				params: IdSchema,
			},
		},
		async (
			request: FastifyRequest<{ Params: IdSchema; Body: UpdateUserBody }>,
		) => {
			const { id } = request.params;
			const { body } = request;
			const result = await services.updateUser(id, body);
			return result;
		},
	);

	scope.delete(
		"/users/:id",
		{
			schema: {
				tags: ["Users"],
				operationId: "deleteUser",
				description: "Exclui um usuário pelo seu ID (soft delete).",
				response: { "2xx": Type.Object({ message: Type.String() }) },
				params: IdSchema,
			},
		},
		async (request: FastifyRequest<{ Params: IdSchema }>) => {
			const { id } = request.params;
			const result = await services.deleteUser(id);
			return result;
		},
	);
});

export default routes;
