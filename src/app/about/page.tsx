"use client";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeamMember {
  name: string;
  photo: string;
  role: string;
  bio: string;
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=6&nat=us");
        const data = await res.json();

        if (data?.results && Array.isArray(data.results)) {
          const roles = [
            "Direktur Utama",
            "Manajer Operasional",
            "Kepala Teknisi Kalibrasi",
            "Spesialis Pelatihan & Sertifikasi",
            "Pengembang Produk & R&D",
            "Marketing & Client Relations",
          ];
          const bio = [
            "Memimpin perusahaan dengan pengalaman lebih dari 15 tahun di bidang otomotif dan lingkungan.",
            "Mengelola operasional harian dan memastikan layanan berjalan efisien dan memuaskan.",
            "Bertanggung jawab atas keakuratan alat melalui kalibrasi dan pemeliharaan berkala.",
            "Menyusun dan memberikan pelatihan alat uji emisi yang praktis dan mudah dipahami.",
            "Mengembangkan alat uji emisi inovatif sesuai kebutuhan industri otomotif lokal.",
            "Menjalin komunikasi aktif dengan klien dan menjalankan strategi pemasaran produk.",
          ];
          const mappedTeam = data.results.map((user: any, index: number) => ({
            name: `${user.name.first} ${user.name.last}`,
            photo: user.picture.large,
            role: roles[index % roles.length],
            bio: bio[index % bio.length],
          }));
          setTeam(mappedTeam);
        }
      } catch (err) {
        console.error("Failed to fetch team data:", err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section className="pb-20">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-10 pb-13 text-center flex flex-col gap-4 items-center">
        <h1 className="text-[50px] max-w-3xl text-[#18182b] font-serif font-black">
          Kenali Kami
        </h1>
        <p className="font-sans max-w-3xl text-[#5e5c5c]">
          Kami bukan sekadar penyedia alat uji emisi — kami adalah tim yang
          peduli pada kualitas udara, keselamatan kendaraan, dan masa depan yang
          lebih bersih. Dengan semangat inovasi dan dedikasi tinggi, kami
          merancang solusi uji emisi yang akurat, mudah digunakan, dan sesuai
          standar lingkungan. Kami hadir untuk mendampingi bengkel, institusi,
          dan pengguna di seluruh Indonesia agar kendaraan tetap layak jalan dan
          ramah lingkungan. Komitmen kami terhadap kualitas juga dibuktikan
          melalui berbagai
          <span>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1.5 font-sans text-blue-700 font-bold cursor-pointer hover:underline border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0">
                sertifikasi resmi
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <a
                  href="https://inovasiindonesia.com/wp-content/uploads/2024/08/sertifikat_tkdn_page-0001-Copy.jpg"
                  target="_blank"
                >
                  <DropdownMenuItem className="font-sans text-[#5e5c5c]">
                    Buatan Anak Bangsa
                  </DropdownMenuItem>
                </a>
                <a
                  href="https://tkdn.kemenperin.go.id/search.php?where=produk&what=Alat+uji+emisi"
                  target="_blank"
                >
                  <DropdownMenuItem className="font-sans text-[#5e5c5c]">
                    P3DN
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
          yang telah kami terima dari lembaga terkait.
        </p>
      </div>

      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-10 pb-13 text-center flex flex-col gap-4 items-center bg-[#18182b]">
        <h1 className="text-[50px] max-w-3xl text-white font-serif font-black">
          Perjalanan Kami
        </h1>
        <p className="font-sans max-w-3xl text-neutral-300">
          Didirikan pada tahun 2018, MS Putra Abadi bermula dari komitmen
          sederhana: menyediakan solusi uji emisi kendaraan yang andal dan
          buatan dalam negeri. Seiring waktu, kami berkembang menjadi penyedia
          alat uji emisi bersertifikat TKDN yang mendukung berbagai bengkel,
          instansi, dan program pemerintah. Dengan semangat inovasi dan dedikasi
          terhadap kualitas udara yang lebih bersih, kami terus menghadirkan
          produk, pelatihan, dan layanan teknis terbaik untuk Indonesia yang
          lebih sehat dan berkelanjutan.
        </p>
      </div>

      <div className="text-[#18182b] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-10 pb-13 text-center flex flex-col gap-6 items-center">
        <h1 className="text-[50px] max-w-3xl font-serif font-black">
          Tim Kami
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full text-left">
          {team.map((member, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-[#18182b77] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#18182b] cursor-pointer text-left"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <img
                    src={member.photo}
                    alt="profile-picture"
                    className="rounded-full size-10"
                  />

                  <div className="flex flex-col gap-0">
                    <h2 className="text-[23px] text-[#18182b] font-serif font-bold">
                      {member.name}
                    </h2>
                    <h2 className="text-[14px] text-[#18182b] font-sans">
                      {member.role}
                    </h2>
                  </div>
                </div>

                <p className="text-[#5e5c5c] py-3 font-sans">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
