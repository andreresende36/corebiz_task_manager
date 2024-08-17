import {
	CamelCasePlugin,
	DeduplicateJoinsPlugin,
	Kysely,
	MysqlDialect,
	ParseJSONResultsPlugin,
} from "kysely";
import { createPool } from "mysql2";
import type { DB } from "./types.js";
import "dotenv/config";

export class FieldOnlyCamelCasePlugin extends CamelCasePlugin {
	protected override snakeCase(str: string): string {
		if (/^[A-Z]/.test(str)) {
			return str;
		}

		return super.snakeCase(str);
	}
}

const db = new Kysely<DB>({
	dialect: new MysqlDialect({
		pool: createPool({
			host: process.env.DATABASE_HOST,
			user: "root",
			password: "password",
			database: "corebiz_task_manager",
			port: 3306,
		}),
	}),
	plugins: [
		new FieldOnlyCamelCasePlugin({ maintainNestedObjectKeys: true }),
		new ParseJSONResultsPlugin(),
		new DeduplicateJoinsPlugin(),
	],
});

export default db;
