import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const testimony = [
  {
    id: 1,
    name: "Andi Pratama",
    jobTitle: "Kepala Bengkel Resmi Honda, Surabaya",
    img: "avatar",
    testimony:
      "“Alat uji emisi dari MS Putra Abadi sangat membantu operasional kami. Proses pengujian jadi lebih cepat, akurat, dan terpercaya. Pelatihan dari tim mereka juga sangat jelas dan aplikatif.”",
  },
  {
    id: 2,
    name: "Budi Santoso",
    jobTitle: "Dinas Lingkungan Hidup, Yogyakarta",
    img: "avatar",
    testimony:
      "“Kami menggunakan produk analyzer emisi dan smoke meter dari MS Putra Abadi dalam program pengujian emisi kendaraan dinas. Alatnya mudah digunakan, dan layanan kalibrasinya sangat responsif.”",
  },
  {
    id: 3,
    name: "Ir. Rina Kartika",
    jobTitle: "Pengelola Balai Uji Emisi, Jakarta",
    img: "avatar",
    testimony:
      "“Sejak menggunakan alat buatan MS Putra Abadi, tingkat akurasi dan efisiensi kerja meningkat signifikan. Yang paling penting, produk ini sudah bersertifikat TKDN, jadi sangat mendukung penggunaan produk dalam negeri.”",
  },
];

const services = [
  {
    id: 1,
    title: "Penyediaan Alat Uji Emisi",
    description:
      "Kami menyediakan Alat Uji Emisi buatan Indonesia dengan sertifikat TKDN 44,57%, menggunakan NDIR Sensor berstandar OIML R99 Class 0. Produk kami mencakup emission analyzer, smoke meter, dan sistem diagnostik terintegrasi yang dirancang untuk memenuhi standar regulasi emisi kendaraan berbahan bakar bensin.",
  },
  {
    id: 2,
    title: "Pelatihan dan Sertifikasi",
    description:
      "Kami menyediakan program pelatihan lengkap bagi operator alat uji emisi, guna memastikan penggunaan alat yang tepat dan efisien. Pelatihan ini dilengkapi dengan sertifikasi resmi yang diakui secara nasional.",
  },
  {
    id: 3,
    title: "Pemeliharaan dan Kalibrasi",
    description:
      "Kami menyediakan layanan pemeliharaan dan kalibrasi rutin untuk memastikan alat uji emisi selalu dalam kondisi optimal dan akurat. Layanan mencakup pemeriksaan teknis, perbaikan, dan kalibrasi ulang sesuai standar resmi.",
  },
];

export default function HomePage() {
  const printTestimony = () => {
    return testimony.map((val) => (
      <Card
        key={val.id}
        className="flex-1 p-6 min-w-[250px] border-[#18182b77] rounded-3xl cursor-pointer transition hover:shadow-md"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <h2 className="text-[23px] text-[#18182b] font-serif font-bold">
              {val.name}
            </h2>
            <h2 className="text-[14px] text-[#18182b] font-sans">
              {val.jobTitle}
            </h2>
          </div>
          <p className="text-[#5e5c5c] py-3 font-sans italic">
            {val.testimony}
          </p>
        </div>
      </Card>
    ));
  };

  const printServices = () => {
    return services.map((val) => (
      <Card
        key={val.id}
        className="flex-1 p-6 min-w-[250px] bg-white border-[#18182b] border rounded-3xl cursor-pointer transition hover:shadow-md hover:shadow-[#9f9f9f]"
      >
        <h2 className="text-[23px] p-0 text-[#18182b] font-serif font-bold">
          {val.title}
        </h2>
        <hr className="border-[#18182b] p-0" />
        <p className="font-sans p-0 text-[#5e5c5c]">{val.description}</p>
      </Card>
    ));
  };

  return (
    <section>
      <div id="hero" className="relative w-full min-h-[70vh] h-screen">
        <div className="absolute inset-0 -z-10 bg-[#18182b]">
          <Image
            src="/banner-image.webp"
            alt="banner"
            fill 
            priority
            quality={100}
            sizes="100vw"
            className="w-full h-full object-cover opacity-50"
            
          />
        </div>

        <div className="relative flex flex-col justify-center items-center md:items-start text-center md:text-left gap-12 h-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-white text-[30px] sm:text-[40px] md:text-[50px] leading-tight font-serif font-black">
              Langkah Kecil Mengenali Emisi, Dampak Besar bagi Bumi.
            </h1>
            <h2 className="text-white text-base sm:text-lg font-sans max-w-md">
              Menghadirkan solusi uji emisi berkualitas tinggi — buatan lokal,
              presisi global. Teknologi yang andal, pelayanan yang menyeluruh —
              akurat, efisien, dan terpercaya.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/about">
              <Button aria-label="about" className="h-12 w-40 backdrop-blur-md bg-[#ffffff44] text-white hover:text-white hover:bg-[#ffffff6f] rounded-full">
                <span className="px-2">Tim Kami</span>
              </Button>
            </a>
            <a href="/product">
              <Button aria-label="product" className="h-12 w-40 backdrop-blur-md bg-[#18182b9e] text-white hover:text-white hover:bg-[#18182b64] rounded-full">
                <span className="pl-2 pr-1 flex gap-2">
                  Produk Kami
                  <span className="flex flex-col justify-center items-center">
                    <ArrowRightIcon />
                  </span>
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-10 text-center flex flex-col gap-4 items-center">
        <h1 className="text-[30px] sm:text-[40px] md:text-[50px] text-[#18182b] font-serif font-black">
          Siapa Kami?
        </h1>
        <p className="font-sans max-w-3xl text-[#5e5c5c] text-sm sm:text-base">
          MS Putra Abadi adalah mitra andal dalam solusi uji emisi kendaraan.
          Kami hadir untuk mendukung kualitas udara yang lebih bersih melalui
          alat uji emisi berbahan bakar bensin yang presisi dan terpercaya.
          Dengan komitmen pada inovasi dan akurasi, kami melayani balai uji
          emisi, bengkel resmi, dan instansi terkait — membantu setiap kendaraan
          melaju dengan sehat, hemat, dan ramah lingkungan.
        </p>
      </div>

      <div className="bg-[#18182b] text-white px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-10 text-center flex flex-col gap-6 items-center">
        <h1 className="text-[30px] sm:text-[40px] md:text-[50px] font-serif font-black">
          Apa yang Kami Kerjakan?
        </h1>
        <div className="flex flex-wrap gap-8 justify-center w-full">
          {printServices()}
        </div>
      </div>

      <div className="text-[#18182b] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-10 text-center flex flex-col gap-6 items-center">
        <h1 className="text-[30px] sm:text-[40px] md:text-[50px] font-serif font-black">
          Kesan Pertama Mereka
        </h1>
        <div className="flex flex-wrap gap-7 justify-center w-full text-left">
          {printTestimony()}
        </div>
      </div>
    </section>
  );
}
