import {
	CamelCasePlugin,
	DeduplicateJoinsPlugin,
	Kysely,
	MysqlDialect,
	ParseJSONResultsPlugin,
} from "kysely";
import { createPool } from "mysql2";
import type { DB } from "./types.js";

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
			host: "localhost",
			user: "root",
			password: "password",
			database: "corebiz_task_manager",
		}),
	}),
	plugins: [
		new FieldOnlyCamelCasePlugin({ maintainNestedObjectKeys: true }),
		new ParseJSONResultsPlugin(),
		new DeduplicateJoinsPlugin(),
	],
});

export default db;
