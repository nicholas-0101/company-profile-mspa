import * as Yup from "yup";

export const CreateSchema = Yup.object().shape({
  title: Yup.string().required("*judul diperlukan"),
  thumbnail: Yup.string().required("*thumbnail diperlukan"),
  content: Yup.string().required("*tulis konten anda"),
  categories: Yup.string().required("*pilih salah satu kategori"),

  });

export interface ICreateValue {
  title: string;
  thumbnail: string;
  content: string;
  categories: string;
}