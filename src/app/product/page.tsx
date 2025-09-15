import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";

const product = [
  {
    id: 1,
    name: "Analyzer Emisi Bensin",
    price: "Rp 18.000.000",
    img: "https://www.bridgeanalyzers.com/cdn/shop/products/5_Gas_Analyzer_in_case_2.jpg?v=1554406001&width=1200",
    description:
      "Mengukur gas buang seperti CO, CO₂, HC, dan O₂ secara presisi untuk memastikan kendaraan memenuhi standar emisi.",
    testi1:
      "“Hasil pengukurannya akurat banget. Bantu kami penuhi standar emisi di DKI.”",
    nameTesti1: "— Bengkel Sahabat Motor, Jakarta",
    testi2:
      "“Sangat mudah dioperasikan bahkan oleh teknisi baru. Desainnya juga compact.”",
    nameTesti2: "— AutoFix Garage, Tangerang",
    testi3:
      "“Sudah pakai lebih dari 1 tahun, masih berfungsi optimal tanpa kendala.”",
    nameTesti3: "— CV Mandiri Utama, Semarang",
  },
  {
    id: 2,
    name: "Smoke Meter",
    price: "Rp 22.000.000",
    img: "https://b2911651.smushcdn.com/2911651/wp-content/uploads/2016/04/BM3101-450x450px.jpg?lossy=1&strip=1&webp=1",
    description:
      "Dirancang untuk mengukur tingkat kepekatan asap mesin bensin, membantu mendeteksi potensi masalah dalam sistem pembakaran.",
    testi1:
      "“Smoke meter ini sangat sensitif dan bisa mendeteksi asap halus sekalipun.”",
    nameTesti1: "— Bengkel Hijau Lestari, Bekasi",
    testi2:
      "“Kualitasnya tidak kalah dengan produk luar negeri. Harganya lebih bersahabat.”",
    nameTesti2: "— Mekar Motor, Jogja",
    testi3: "“Sangat membantu saat uji berkala kendaraan dinas kami.”",
    nameTesti3: "— Dinas Perhubungan Kota Surabaya",
  },
  {
    id: 3,
    name: "Gas Analyzers Portabel",
    price: "Rp 13.500.000",
    img: "https://www.forensicsdetectors.com/cdn/shop/files/FrontDetectorOnly.jpg?v=1701904121&width=3593",
    description:
      "Unit portabel yang memungkinkan pengujian emisi di berbagai lokasi dengan hasil cepat dan mudah dibaca.",
    testi1:
      "“Portabel banget! Praktis dibawa untuk inspeksi langsung ke lapangan.”",
    nameTesti1: "— PT Ecomaster Indonesia, Jakarta",
    testi2:
      "“Pengoperasiannya cepat dan tidak ribet. Cocok untuk kerja lapangan.”",
    nameTesti2: "— Tim Emisi Cepat, Denpasar",
    testi3:
      "“Unitnya kecil tapi performanya luar biasa. Bantu proses survei emisi kendaraan kami.”",
    nameTesti3: "— Bengkel Sahabat Jaya, Tangerang Selatan",
  },
  {
    id: 4,
    name: "Sistem Diagnostik",
    price: "Rp 27.000.000",
    img: "https://m.media-amazon.com/images/I/714snF-8eHL._UF894%2C1000_QL80_.jpg",
    description:
      "Mengukur emisi sekaligus mendiagnosa masalah mesin yang memengaruhi performa kendaraan—semua dalam satu sistem terpadu.",
    testi1:
      "“Fitur diagnosa dan pengujian dalam satu alat sangat menghemat waktu.”",
    nameTesti1: "— Bengkel Citra Mobil, Jakarta Barat",
    testi2: "“Kami bisa langsung tahu masalah mesin yang memengaruhi emisi.”",
    nameTesti2: "— CV Prima Autotech, Medan",
    testi3:
      "“User interface-nya jelas dan intuitif. Teknisi cepat belajar pakainya.”",
    nameTesti3: "— PT Ganesha Motor, Surabaya",
  },
  {
    id: 5,
    name: "Perangkat Pendukung",
    price: "Rp 5.500.000",
    img: "https://i.ebayimg.com/images/g/3PkAAOSw~R1bLlNl/s-l400.jpg",
    description:
      "Termasuk printer hasil uji, sensor, dan software pelaporan untuk memudahkan proses dokumentasi dan pelacakan hasil uji emisi.",
    testi1:
      "“Printer hasil uji sangat membantu kami membuat laporan profesional.”",
    nameTesti1: "— AutoPrint Bengkel, Palembang",
    testi2: "“Sensor cadangannya memudahkan kalau ada kerusakan mendadak.”",
    nameTesti2: "— Bengkel Sinar Abadi, Surabaya",
    testi3: "“Software pelaporan memudahkan input data ke dinas.”",
    nameTesti3: "— DLH Kota Depok",
  },
];

export default function ProductPage() {
  const printProduct = () => {
    return product.map((val) => (
      <Dialog key={val.id}>
        <DialogTrigger asChild>
          <Card className="p-6 min-w-[250px] border-[#18182b77] transition hover:shadow-md rounded-3xl">
            <button
              type="button"
              className="w-full h-full text-left cursor-pointer flex flex-col items-center justify-center gap-2"
              
            >
              <div className="flex flex-col gap-2">
                <Image
                  src={val.img}
                  width={300}
                  height={200}
                  alt={`Gambar produk ${val.name}`}
                  className="size-full object-cover rounded-md w-40"
                />
                <hr className="border-[#18182b]" />
                <h2 className="text-[16px] text-[#18182b] font-sans font-bold">
                  {val.name}
                </h2>
              </div>
            </button>
          </Card>
        </DialogTrigger>

        <DialogContent
          style={{ width: "800px", maxWidth: "92vw", maxHeight: "75vh" }}
          className="rounded-3xl overflow-y-auto"
          id="product-dialog"
        >
          <DialogClose className="absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="justify-center items-center flex">
              <Image
                src={val.img}
                width={300}
                height={200}
                alt="product-image"
                className="w-70 rounded-lg mt-4"
              />
            </div>
            <DialogHeader className="flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-2">
                <DialogTitle className="font-sans text-3xl text-[#18182b] font-black">
                  {val.name}
                </DialogTitle>
                <DialogTitle className="font-sans text-xl text-[#18182b] font-black">
                  {val.price}
                </DialogTitle>
                <DialogDescription className="text-[#5e5c5c] font-sans">
                  {val.description}
                </DialogDescription>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-sans text-[#18182b] font-bold">
                  Testimoni Pelanggan
                </h1>
                <div className="gap-0">
                  <DialogDescription className="text-[#5e5c5c] font-sans border-l-3 pl-3 border-[#18182b] italic">
                    {val.testi1}
                  </DialogDescription>
                  <DialogDescription className="text-[#5e5c5c] font-sans border-l-3 pl-3 border-[#18182b] italic">
                    {val.nameTesti1}
                  </DialogDescription>
                </div>
                <div className="gap-0">
                  <DialogDescription className="text-[#5e5c5c] font-sans border-l-3 pl-3 border-[#18182b] italic">
                    {val.testi2}
                  </DialogDescription>
                  <DialogDescription className="text-[#5e5c5c] font-sans border-l-3 pl-3 border-[#18182b] italic">
                    {val.nameTesti2}
                  </DialogDescription>
                </div>
                <div className="gap-0">
                  <DialogDescription className="text-[#5e5c5c] font-sans border-l-3 pl-3 border-[#18182b] italic">
                    {val.testi3}
                  </DialogDescription>
                  <DialogDescription className="text-[#5e5c5c] font-sans border-l-3 pl-3 border-[#18182b] italic">
                    {val.nameTesti3}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    ));
  };

  return (
    <section>
      <div className="text-[#18182b] text-center flex flex-col justify-center gap-10 items-center min-h-screen px-4 sm:px-8 md:px-12 pb-40 py-10">
        <div>
          <h1 className="text-[50px] max-w-3xl font-serif font-black">
            Produk Kami
          </h1>
          <p className="font-sans max-w-3xl text-[#5e5c5c]">
            Kami menyediakan solusi uji emisi kendaraan yang dirancang presisi —
            akurat, andal, dan siap mendukung udara yang lebih bersih.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 w-full justify-center">
          {printProduct()}
        </div>
      </div>
    </section>
  );
}
