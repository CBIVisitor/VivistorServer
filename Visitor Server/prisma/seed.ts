import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ProfileData = ['VIP', 'زائر', 'مخول', 'متدرب']
const PersonData = [
  { username: 'main', password: '123456' },
  { username: 'Admin', password: '123456' },
  { username: 'Mainuser', password: '123456' },
  { username: 'User1', password: '123456' },
  { username: 'User2', password: '123456' },
  { username: 'User3', password: '123456' },
  { username: 'Center1', password: '123456' },
  { username: 'Center2', password: '123456' },
  { username: 'VIP', password: '123456' },
  { username: 'PR', password: '123456' },
]
const RoleData = ['Administrator', 'MainDoor', 'Door', 'Tracking', 'Visitors', 'Report', 'Events', 'P1', 'P2', 'P3', 'P4', 'D1', 'D2', 'D3', 'D4']
const DoorData = ['التشريفات', 'البناية رقم 1', 'البناية رقم 2', 'البناية رقم 3']
const GenderData = ['ذكر', 'أنثى']

async function main() {
  
  console.log(`Start seeding ...`)
  for (const o of ProfileData) {
    const profile = await prisma.profile.create({
      data: {
        bio: o
      },
    })
    console.log(`Created profile with id: ${profile.id}`)
  }
  for (const o of PersonData) {
    const person = await prisma.person.create({
      data: {
        username: o.username,
        password: o.password
      },
    })
    console.log(`Created person with id: ${person.id}`)
  }
  for (const o of RoleData) {
    const role = await prisma.role.create({
      data: {
        name: o
      },
    })
    console.log(`Created role with id: ${role.id}`)
  }

  for (const o of GenderData) {
    const Gender = await prisma.gender.create({
      data: {
        name: o
      },
    })
    console.log(`Created Gender with id: ${Gender.id}`)
  }
  for (const o of DoorData) {
    const door = await prisma.door.create({
      data: {
        name: o
      },
    })
    console.log(`Created door with id: ${door.id}`)
  }

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
