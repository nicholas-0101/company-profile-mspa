import { PrismaClient } from "../src/generated/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.blog.deleteMany();
  await prisma.account.deleteMany();

  const hashedPassword = await bcrypt.hash("Password123", 10);

  // Create Users
  const adminAccount = await prisma.account.create({
    data: {
      username: "Admin MSPA",
      email: "admin@mspa.com",
      password: hashedPassword,
    },
  });

  const drRinaAccount = await prisma.account.create({
    data: {
      username: "Dr. Rina",
      email: "dr.rina@mspa.com",
      password: hashedPassword,
    },
  });

  const budiAccount = await prisma.account.create({
    data: {
      username: "Budi Santoso",
      email: "budi.santoso@mspa.com",
      password: hashedPassword,
    },
  });

  // Create Blogs with Slugs
  const blogData = [
    {
      title: "Pentingnya Uji Emisi Kendaraan untuk Kualitas Udara",
      thumbnail:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      content:
        "Uji emisi kendaraan merupakan salah satu langkah penting dalam menjaga kualitas udara di perkotaan. Dengan melakukan uji emisi secara rutin, kita dapat memastikan bahwa kendaraan yang beroperasi di jalan raya tidak mengeluarkan polutan melebihi batas yang ditentukan. Proses ini melibatkan pengukuran kadar gas buang seperti CO, HC, CO2, dan O2 menggunakan alat uji emisi yang telah dikalibrasi. Hasil pengujian ini menjadi dasar bagi pemilik kendaraan untuk melakukan perbaikan mesin jika diperlukan, sehingga emisi gas buang dapat ditekan seminimal mungkin. Di Indonesia, regulasi uji emisi telah diterapkan di berbagai kota besar, dan MS Putra Abadi hadir sebagai penyedia alat uji emisi berkualitas tinggi yang mendukung program pemerintah dalam menjaga lingkungan.",
      categories: "Lingkungan",
      createdAt: new Date("2026-03-15T10:30:00.000Z"),
      accountId: adminAccount.id,
    },
    {
      title: "Teknologi NDIR Sensor dalam Alat Uji Emisi Modern",
      thumbnail:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      content:
        "Teknologi Non-Dispersive Infrared (NDIR) telah menjadi standar utama dalam pengukuran emisi gas buang kendaraan. Sensor NDIR bekerja dengan memanfaatkan prinsip penyerapan inframerah oleh molekul gas, di mana setiap jenis gas memiliki panjang gelombang penyerapan yang unik. Keunggulan utama dari sensor NDIR adalah tingkat akurasi yang sangat tinggi, respons pengukuran yang cepat, serta daya tahan yang lama. Alat uji emisi buatan MS Putra Abadi menggunakan NDIR Sensor berstandar OIML R99 Class 0, yang merupakan standar tertinggi untuk alat pengukuran emisi. Dengan teknologi ini, hasil pengujian menjadi lebih presisi dan dapat diandalkan untuk keperluan regulasi maupun pemeliharaan kendaraan.",
      categories: "Teknologi",
      createdAt: new Date("2026-03-20T14:00:00.000Z"),
      accountId: adminAccount.id,
    },
    {
      title: "Dampak Polusi Udara terhadap Kesehatan Masyarakat",
      thumbnail:
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80",
      content:
        "Polusi udara yang dihasilkan oleh kendaraan bermotor memiliki dampak serius terhadap kesehatan masyarakat. Paparan jangka panjang terhadap gas buang kendaraan seperti karbon monoksida (CO), nitrogen oksida (NOx), dan partikel halus (PM2.5) dapat menyebabkan berbagai gangguan pernapasan, penyakit kardiovaskular, hingga kanker paru-paru. Menurut data WHO, polusi udara menjadi penyebab sekitar 7 juta kematian prematur setiap tahunnya. Oleh karena itu, upaya pengendalian emisi kendaraan melalui program uji emisi berkala menjadi sangat krusial. Dengan memastikan setiap kendaraan lolos uji emisi, kita turut berkontribusi dalam melindungi kesehatan diri sendiri and orang-orang di sekitar kita.",
      categories: "Kesehatan",
      createdAt: new Date("2026-03-25T09:15:00.000Z"),
      accountId: drRinaAccount.id,
    },
    {
      title: "Peluang Bisnis Bengkel Uji Emisi di Indonesia",
      thumbnail:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      content:
        "Dengan semakin ketatnya regulasi pemerintah terkait uji emisi kendaraan, peluang bisnis bengkel uji emisi di Indonesia terbuka lebar. Peraturan Menteri Lingkungan Hidup mengharuskan setiap kendaraan yang beroperasi di jalan raya untuk melakukan uji emisi secara berkala. Hal ini menciptakan permintaan yang tinggi akan bengkel-bengkel yang menyediakan layanan uji emisi. Investasi awal untuk mendirikan bengkel uji emisi relatif terjangkau, terutama dengan menggunakan alat uji emisi buatan dalam negeri yang memiliki harga lebih kompetitif namun tetap berkualitas tinggi. MS Putra Abadi menyediakan paket lengkap mulai dari alat uji emisi, pelatihan operator, hingga dukungan teknis berkelanjutan.",
      categories: "Ekonomi",
      createdAt: new Date("2026-04-01T11:45:00.000Z"),
      accountId: budiAccount.id,
    },
    {
      title: "Kegiatan Pelatihan Operator Uji Emisi Batch 12",
      thumbnail:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
      content:
        "MS Putra Abadi kembali mengadakan pelatihan operator uji emisi Batch 12 yang diikuti oleh 30 peserta dari berbagai daerah di Indonesia. Pelatihan selama 3 hari ini mencakup materi teori tentang prinsip kerja mesin dan emisi gas buang, praktik penggunaan alat uji emisi, serta prosedur kalibrasi dan perawatan alat. Para peserta mendapatkan sertifikat kompetensi yang diakui secara nasional setelah menyelesaikan seluruh rangkaian pelatihan dan lulus ujian akhir. Kegiatan ini merupakan bagian dari komitmen MS Putra Abadi dalam memastikan setiap operator mampu menggunakan alat uji emisi dengan benar dan menghasilkan data pengukuran yang akurat.",
      categories: "Kegiatan",
      createdAt: new Date("2026-04-05T08:00:00.000Z"),
      accountId: adminAccount.id,
    },
    {
      title: "Sertifikasi TKDN and Kontribusi Produk Lokal",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      content:
        "Tingkat Komponen Dalam Negeri (TKDN) merupakan sertifikasi penting yang menunjukkan seberapa besar kandungan lokal dalam suatu produk. Alat uji emisi buatan MS Putra Abadi telah mendapatkan sertifikat TKDN sebesar 44,57%, menunjukkan komitmen perusahaan dalam mendukung industri dalam negeri. Sertifikasi TKDN tidak hanya menjadi kebanggaan tersendiri, tetapi juga memberikan keunggulan kompetitif dalam pengadaan pemerintah yang memprioritaskan produk dengan TKDN tinggi. Dengan menggunakan produk ber-TKDN, instansi pemerintah dan swasta turut mendukung pertumbuhan ekonomi lokal dan kemandirian teknologi nasional.",
      categories: "Teknologi",
      createdAt: new Date("2026-04-08T13:30:00.000Z"),
      accountId: adminAccount.id,
    },
  ];

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  for (const blog of blogData) {
    await prisma.blog.create({
      data: {
        ...blog,
        slug: slugify(blog.title),
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
