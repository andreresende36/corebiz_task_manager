import db from "../db.js";
import type {
	CreateTaskBody,
	TaskSchema,
	UpdateTaskBody,
} from "../schemas/schemas.js";
import { httpErrors } from "@fastify/sensible";

export default class TaskServices {
	async getTasks(): Promise<TaskSchema[]> {
		try {
			const tasks = await db
				.selectFrom("Tasks")
				.innerJoin("Users", "Users.id", "Tasks.userId")
				.select([
					"Tasks.id",
					"title",
					"description",
					"dueDate",
					"status",
					"Users.name as userName",
					"Tasks.createdAt",
				])
				.where("Tasks.deletedAt", "is", null)
				.execute();
			return tasks;
		} catch (error) {
			throw httpErrors.badRequest((error as Error).message);
		}
	}
	async getTaskById(id: number): Promise<TaskSchema> {
		const task = await db
			.selectFrom("Tasks")
			.innerJoin("Users", "Users.id", "Tasks.userId")
			.select([
				"Tasks.id",
				"title",
				"description",
				"dueDate",
				"status",
				"Users.name as userName",
			])
			.where("Tasks.id", "=", id)
			.where("Tasks.deletedAt", "is", null)
			.executeTakeFirstOrThrow(() =>
				httpErrors.notFound(`Task with ID ${id} not found`),
			);
		return task;
	}

	async createTask(dto: CreateTaskBody) {
		const task = await db
			.insertInto("Tasks")
			.values(dto)
			.executeTakeFirstOrThrow(() =>
				httpErrors.badRequest("Task could not be created"),
			);
		return { id: task?.insertId, ...dto };
	}

	async updateTask(id: number, dto: UpdateTaskBody) {
		const validStatuses = ["pendente", "concluido", "em_progresso"];
		if (dto.status && !validStatuses.includes(dto.status))
			throw httpErrors.badRequest("Invalid status provided");
		if (!Object.keys(dto).length) {
			throw httpErrors.badRequest("No fields to update task provided");
		}
		const updatedTask = await db
			.updateTable("Tasks")
			.set(dto)
			.where("id", "=", id)
			.executeTakeFirst();
		if (!updatedTask.numUpdatedRows) {
			throw httpErrors.notFound(`Task with ID ${id} could not be updated`);
		}
		return { message: `Task with ID ${id} successfully updated` };
	}
	async deleteTask(id: number) {
		const deletedTask = await db
			.updateTable("Tasks")
			.set({ deletedAt: new Date() })
			.where("id", "=", id)
			.where("Tasks.deletedAt", "is", null)
			.executeTakeFirst();
		if (!deletedTask.numUpdatedRows) {
			throw httpErrors.notFound(`Task with ID ${id} could not be deleted`);
		}
		return { message: `Task with ID ${id} successfully deleted` };
	}
}
