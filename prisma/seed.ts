import { db } from "../app/lib/db"

async function main() {
    await db.user.create({
        data: {
            email: `test@gmail.com`,
            username: 'test',
            password: 'test123'
        }
    })
}

main()
    .catch(e => {
    console.error(e)
    process.exit(1)
    })
    .finally(async () => {
    await db.$disconnect()
    })