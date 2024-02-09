const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: `test@gmail.com`,
            username: 'test'
        }
    })
}

main()
    .catch(e => {
    console.error(e)
    process.exit(1)
    })
    .finally(async () => {
    await prisma.$disconnect()
    })