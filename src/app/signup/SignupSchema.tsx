import * as Yup from "yup";
import axios from "axios";

export const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("*nama diperlukan"),
  email: Yup.string()
    .email("*email tidak valid")
    .required("*email diperlukan")
    .test(
      "is-email-not-registered", // if email not registered
      "*email sudah terdaftar", // if email registerd
      async (value) => {
        if (!value) return false;
        try {
          const res = await axios.get(`/api/auth/check-email?email=${value}`);
          return !res.data.exists;
        } catch (error) {
          console.error("Query error:", error);
          return false; // fail validation on error
        }
      }
    ),
  password: Yup.string()
    .min(6, "*password minimal 6 karakter")
    .required("*password diperlukan"),
});


export interface ISignUpValue {
  username: string;
  email: string;
  password: string;
}
