import prisma from "../lib/prisma";

async function main() {
    const admin = await prisma.users.create( {
        data: {
            userName: "admin",
            role: 'admin',
            password: 'adminc2ca'
        }
    });

    const viewer = await prisma.users.create( {
        data: {
            userName: "viewer",
            role: 'viewer',
            password: 'viewerc2ca'
        }
    })

    const producer = await prisma.users.create( {
        data: {
            userName: "producer",
            role: 'producer',
            password: 'producerc2ca'
        }
    })
}
main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})