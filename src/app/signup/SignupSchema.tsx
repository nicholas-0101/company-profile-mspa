import * as Yup from "yup";

import Backendless from "backendless"; // to check email has registered or not
Backendless.initApp("624FAF5A-578D-4D43-B90A-E074169B79B5", "A629C5C9-8427-4DA5-9418-2B765EDB06F3"); // (app-id, js-api-key) -> see from the backendless -> settings

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
          const accounts = await Backendless.Data.of("accounts").find({
            where: `email = '${value}'`,
          });

          return accounts.length === 0; // returning true when accounts.length === 0, you're telling Yup: Validation passed — this email is not in use. If accounts.length > 0, it means the email is already registered, and: Yup will return a validation error message: "email is already registered"
        } catch (error) {
          console.error("Backendless query error:", error);
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
