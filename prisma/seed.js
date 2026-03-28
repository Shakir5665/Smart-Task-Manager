import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // Optional: clear existing data before seeding
  await prisma.task.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create Example User with nested Categories and Tasks
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password_123', // REMEMBER: Use bcrypt/argon2 in production!
      categories: {
        create: [
          { name: 'Development' },
          { name: 'Personal' }
        ]
      },
      tasks: {
        create: [
          {
            title: 'Setup Prisma ORM',
            description: 'Initialize Prisma with PostgreSQL and define schema.',
            status: 'COMPLETED',
            priority: 3,
            dueDate: new Date()
          },
          {
            title: 'Create Dashboard UI',
            description: 'Design interactive dashboard for tasks.',
            status: 'PENDING',
            priority: 2,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)) // 7 days from now
          }
        ]
      }
    }
  });

  console.log(`Seeding complete! User '${user.name}' created with Tasks and Categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
