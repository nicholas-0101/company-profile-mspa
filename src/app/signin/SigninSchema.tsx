import * as Yup from "yup";

import Backendless from "backendless"; // to check email has registered or not
Backendless.initApp("624FAF5A-578D-4D43-B90A-E074169B79B5", "A629C5C9-8427-4DA5-9418-2B765EDB06F3"); // (app-id, js-api-key) -> see from the backendless -> settings

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("*email tidak valid")
    .required("*email diperlukan")
    .test(
      "is-email-registered", // if email registered
      "*email belum terdaftar", // if email not registerd
      async (value) => {
        if (!value) return false;
        try {
          const accounts = await Backendless.Data.of("accounts").find({
            where: `email = '${value}'`
          });

          return accounts.length > 0; // return true if the email is found
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


export interface ISignInValue{
    email:string;
    password:string;
}


