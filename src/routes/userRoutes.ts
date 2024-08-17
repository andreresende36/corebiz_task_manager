import type { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { Type } from "@sinclair/typebox";
import UserServices from "../services/userServices.js";
import {
	UserSchema,
	type CreateUserBody,
	type UpdateUserBody,
	type IdSchema,
} from "../schemas/schemas.js";

const services = new UserServices();

const routes = fp(async (scope: FastifyInstance) => {
	scope.get(
		"/users",
		{
			schema: {
				tags: ["Users"],
				operationId: "getUsers",
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
				response: { "2xx": UserSchema },
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
				response: { "2xx": UserSchema },
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
				response: { "2xx": Type.Object({ message: Type.String() }) },
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
				response: { "2xx": Type.Object({ message: Type.String() }) },
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
