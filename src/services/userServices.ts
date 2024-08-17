import db from "../db.js";
import type { CreateUserBody, UpdateUserBody } from "../schemas/schemas.js";
import { httpErrors } from "@fastify/sensible";

export default class UserServices {
	async getUsers() {
		try {
			const users = await db
				.selectFrom("Users")
				.select(["id", "name", "email"])
				.where("Users.deletedAt", "is", null)
				.execute();
			return users;
		} catch (error) {
			throw httpErrors.badRequest((error as Error).message);
		}
	}

	async getUserById(id: number) {
		const user = await db
			.selectFrom("Users")
			.select(["id", "name", "email"])
			.where("Users.id", "=", id)
			.where("Users.deletedAt", "is", null)
			.executeTakeFirstOrThrow(() =>
				httpErrors.notFound(`User with ID ${id} not found`),
			);
		return user;
	}

	async createUser(dto: CreateUserBody) {
		const user = await db
			.insertInto("Users")
			.values(dto)
			.executeTakeFirstOrThrow(() =>
				httpErrors.badRequest("User could not be created"),
			);
		return { id: user?.insertId, ...dto };
	}

	async updateUser(id: number, dto: UpdateUserBody) {
		const updatedUser = await db
			.updateTable("Users")
			.set(dto)
			.where("id", "=", id)
			.executeTakeFirst();
		if (!updatedUser.numUpdatedRows) {
			throw httpErrors.notFound(`User with ID ${id} could not be updated`);
		}
		return { message: `User with ID ${id} successfully updated` };
	}

	async deleteUser(id: number) {
		const deletedUser = await db
			.updateTable("Users")
			.set({ deletedAt: new Date() })
			.where("id", "=", id)
			.where("Users.deletedAt", "is", null)
			.executeTakeFirst();
		if (!deletedUser.numUpdatedRows) {
			throw httpErrors.notFound(`User with ID ${id} could not be deleted`);
		}
		return { message: `User with ID ${id} successfully deleted` };
	}
}
