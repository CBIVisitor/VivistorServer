import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const rr1 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 1 } }, role: { connect: { id: 1 }, }, }
    }).catch(datas => { console.log(datas) })


    const rr2 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 2 } }, role: { connect: { id: 1 }, }, }
    }).catch(datas => { console.log(datas) }) 

    const rr3 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 3 } }, role: { connect: { id: 2 } }, }
    }).catch(datas => { console.log(datas) }) 

    const rr4 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 3 } }, role: { connect: { id: 4 } }, }
    }).catch(datas => { console.log(datas) })
    const rr5 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 3 } }, role: { connect: { id: 5 } }, }
    }).catch(datas => { console.log(datas) })
    const rr6 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 3 } }, role: { connect: { id: 6 } }, }
    }).catch(datas => { console.log(datas) })
    const rr7 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 4 } }, role: { connect: { id: 8 } }, }
    }).catch(datas => { console.log(datas) })
    const rr8 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 5 } }, role: { connect: { id: 9 } }, }
    }).catch(datas => { console.log(datas) })
    const rr9 = await prisma.roleForPerson.create({
        data: { person: { connect: { id: 6 } }, role: { connect: { id: 10 } }, }
    }).catch(datas => { console.log(datas) })

    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        //process.exit(1)  
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
