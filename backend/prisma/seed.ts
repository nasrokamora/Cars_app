import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const brands = [
    { name: 'Toyota' },
    { name: 'Honda' },
    { name: 'Ford' },
    { name: 'Chevrolet' },
    { name: 'Nissan' },
    { name: 'BMW' },
    { name: 'Mercedes-Benz' },
    { name: 'Volkswagen' },
    { name: 'Hyundai' },
    { name: 'Kia' },
    { name: 'Subaru' },
    { name: 'Mazda' },
    { name: 'Audi' },
    { name: 'Lexus' },
    { name: 'Porsche' },
    { name: 'Tesla' },
    { name: 'Jaguar' },
    { name: 'Land Rover' },
    { name: 'Volvo' },
    { name: 'Mitsubishi' },
    { name: 'Fiat' },
    { name: 'Peugeot' },
    { name: 'Citroën' },
    { name: 'Renault' },
    { name: 'Opel' },
    { name: 'Chrysler' },
    { name: 'Dodge' },
    { name: 'Jeep' },
    { name: 'Buick' },
    { name: 'GMC' },
    { name: 'Lincoln' },
    { name: 'Infiniti' },
    { name: 'Acura' },
    { name: 'Mini' },
    { name: 'Alfa Romeo' },
    { name: 'Bentley' },
    { name: 'Rolls-Royce' },
    { name: 'Maserati' },
    { name: 'Ferrari' },
    { name: 'Lamborghini' },
    { name: 'Aston Martin' },
    { name: 'Bugatti' },
    { name: 'McLaren' },
    { name: 'Pagani' },
    { name: 'Lotus' },
    { name: 'Smart' },
    { name: 'Scion' },
    { name: 'Genesis' },
    { name: 'Polestar' },
    { name: 'Rivian' },
    { name: 'cherry' },
    { name: 'Geely' },
    { name: 'BYD' },
    { name: 'SAIC Motor' },
    { name: 'Great Wall Motors' },
    { name: 'Dongfeng Motor' },
    { name: 'FAW Group' },
    { name: 'Changan Automobile' },
    { name: 'NIO' },
    { name: 'Xpeng Motors' },
  ];
  await prisma.brand.createMany({
    data: brands,
    skipDuplicates: true, // Skip duplicates if any
  });
  console.log('Brands seeded successfully');
}
// تشغيل الدالة الرئيسية ومعالجة أي خطأ قد يحدث
main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
    console.log('Prisma client disconnected');
  });
