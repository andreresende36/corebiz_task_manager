import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const TaskStatus = {
    pendente: "pendente",
    em_progresso: "em_progresso",
    concluido: "concluido"
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export type Tasks = {
    id: Generated<number>;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
    userId: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    deletedAt: Timestamp | null;
};
export type Users = {
    id: Generated<number>;
    name: string;
    email: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    deletedAt: Timestamp | null;
};
export type DB = {
    Tasks: Tasks;
    Users: Users;
};
