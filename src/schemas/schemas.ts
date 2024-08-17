import { type Static, Type } from "@sinclair/typebox";

export type TaskSchema = Static<typeof TaskSchema>;
export const TaskSchema = Type.Object({
	id: Type.Number(),
	title: Type.String(),
	description: Type.String(),
	dueDate: Type.String({ format: "date" }),
	status: Type.Union([
		Type.Literal("pendente"),
		Type.Literal("em_progresso"),
		Type.Literal("concluido"),
	]),
	userName: Type.String(),
});

export type CreateTaskBody = Static<typeof CreateTaskBody>;
export const CreateTaskBody = Type.Object({
	title: Type.String(),
	description: Type.String(),
	dueDate: Type.String({ format: "date" }),
	status: Type.Union([
		Type.Literal("pendente"),
		Type.Literal("em_progresso"),
		Type.Literal("concluido"),
	]),
	userId: Type.Number(),
});

export type CreateTaskResponse = Static<typeof CreateTaskResponse>;
export const CreateTaskResponse = Type.Object({
	id: Type.Number(),
	title: Type.String(),
	description: Type.String(),
	dueDate: Type.String({ format: "date" }),
	status: Type.Union([
		Type.Literal("pendente"),
		Type.Literal("em_progresso"),
		Type.Literal("concluido"),
	]),
	userId: Type.Number(),
});

export type UpdateTaskBody = Static<typeof UpdateTaskBody>;
export const UpdateTaskBody = Type.Object({
	title: Type.Optional(Type.String()),
	description: Type.Optional(Type.String()),
	dueDate: Type.Optional(Type.String({ format: "date" })),
	status: Type.Optional(
		Type.Union([
			Type.Literal("pendente"),
			Type.Literal("em_progresso"),
			Type.Literal("concluido"),
		]),
	),
	userId: Type.Optional(Type.Number()),
});

export type UserSchema = Static<typeof UserSchema>;
export const UserSchema = Type.Object({
	id: Type.Number(),
	name: Type.String(),
	email: Type.String({ format: "email" }),
});

export const IdSchema = Type.Object({
	id: Type.Number(),
});

export type IdSchema = Static<typeof IdSchema>;

export const Uuid = Type.String({
	format: "uuid",
	minLength: 36,
	maxLength: 36,
});
