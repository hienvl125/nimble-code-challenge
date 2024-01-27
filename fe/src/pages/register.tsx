import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import type { RegisterUserCredentials } from "../models/user";
import { RegisterUser } from "../services/user_service";
import { useFlashMessage } from "../context/flash_message";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { setFlashMessage } = useFlashMessage();
  const [errorAlert, setErrorAlert] = useState<string>("");
  const mutation = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      setFlashMessage("success", "Registered account successfully");
      router.push("/login");
    },
    onError: () => {
      setErrorAlert("Invalid credentials")
    }
  });

  function onSubmitRegisterForm(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const emailValue = formData.get('email') as string;
    const passwordValue = formData.get('password') as string;
    const passwordConfirmationValue = formData.get('password_confirmation') as string;
    if (passwordValue != passwordConfirmationValue) {
      setErrorAlert("Password doesn't match password confirmation")
      return
    }

    const newUser: RegisterUserCredentials = {
      email: emailValue,
      password: passwordValue
    }
    mutation.mutate(newUser);
  }


  return (
    <main className="max-w-96 border p-5 mx-auto mt-5">
      <div className="mb-5">
        <h1 className="text-center font-medium text-4xl">NGSA</h1>
      </div>
      {errorAlert && (
        <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <div className="text-sm font-medium">
            {errorAlert}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 dark:text-red-400 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-2"
            aria-label="Close"
            onClick={() => setErrorAlert("")}
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      )}
      <form onSubmit={onSubmitRegisterForm}>
        <div className="mb-2">
          <input className="bg-gray-50 border rounded-md w-full p-2" type="email" name="email" placeholder="foo@bar.com" required/>
        </div>

        <div className="mb-2">
          <input className="bg-gray-50 border rounded-md w-full p-2" type="password" name="password" placeholder="password" required/>
        </div>

        <div className="mb-5">
          <input className="bg-gray-50 border rounded-md w-full p-2" type="password_confirmation" name="password_confirmation" placeholder="confirm your password" required/>
        </div>

        <button type="submit" className="text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 w-full">
          Register
        </button>
      </form>

      <div className="text-center mt-5 text-gray-500">
        Have an account?
        &nbsp;
        <Link href="/login" className="text-blue-500 hover:text-blue-700">Log in</Link>
      </div>
    </main>
  )
}
