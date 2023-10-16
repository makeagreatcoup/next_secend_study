const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "JAVA" },
        { name: "生活" },
        { name: "图片" },
        { name: "PHP" },
        { name: "编程技巧" },
        { name: "人生" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();