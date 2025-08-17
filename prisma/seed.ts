import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, be careful in production)
  await prisma.components.deleteMany();

  // Seed components
  const components = await prisma.components.createMany({
    data: [
      {
        id: "button",
        name: "Button",
        description: "A customizable button component.",
        codeUrl:
          "https://github.com/username/repo/components/Button/Button.tsx",
        tags: ["UI", "Form", "Button"],
      },
      {
        id: "pricing",
        name: "Pricing",
        description: "A pricing table component.",
        codeUrl:
          "https://raw.githubusercontent.com/m-sanjid/dev_stats/main/components/Pricing.tsx",
        tags: ["E-commerce", "Pricing"],
      },
    ],
  });

  console.log("Seeding complete", components);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
