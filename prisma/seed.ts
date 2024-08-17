import { PrismaClient, type TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();
const NUMBER_OF_ENTITIES = 10;
const generateRandomDate = () => {
	const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
	const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
	const year = Math.floor(Math.random() * (2025 - 2023) + 2023);
	return `${day}-${month}-${year}`;
};

const getRandomStatus = () => {
	const statuses = ["pendente", "em_progresso", "concluido"];
	const randomIndex = Math.floor(Math.random() * statuses.length);
	return statuses[randomIndex];
};

const getRandomUserId = () => {
	return Math.floor(Math.random() * NUMBER_OF_ENTITIES) + 1;
};

const seed = async () => {
	await prisma.users.deleteMany();

	// Create 10 Users
	await Promise.all(
		Array.from({ length: NUMBER_OF_ENTITIES }).map((_, index) =>
			prisma.users.create({
				data: {
					name: `User ${index + 1}`,
					email: `user${index + 1}@example.com`,
				},
			}),
		),
	);

	// Create 10 Tasks
	await Promise.all(
		Array.from({ length: NUMBER_OF_ENTITIES }).map((_, index) =>
			prisma.tasks.create({
				data: {
					title: `Task ${index + 1}`,
					description: `Description for task ${index + 1}`,
					dueDate: generateRandomDate(),
					status: getRandomStatus() as TaskStatus,
					userId: getRandomUserId(),
				},
			}),
		),
	);

	console.log("Seed data inserted");
};

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
