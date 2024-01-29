import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import type { RegisterUserCredentials } from "../models/user";
import { RegisterUser } from "../services/user_service";
import { useRouter } from "next/navigation";
import AlertMessage from "@/components/AlertMessage"
import { useFlashMessageStore } from "@/stores/FlashMessageStore";

export default function Register() {
  const router = useRouter();
  const { setFlashMessage } = useFlashMessageStore();
  const [errorAlert, setErrorAlert] = useState<string>("");
  const mutation = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
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

    setFlashMessage({ flashMessageType: "success", flashMessageContent: "Registered account successfully" });
    router.push("/login")
  }


  return (
    <main className="max-w-96 border p-5 mx-auto mt-5 shadow-lg">
      <div className="mb-5">
        <h1 className="text-center font-medium text-4xl">NGSA</h1>
      </div>

      {errorAlert && <AlertMessage messageType="error" messageContent={errorAlert} onClickCloseButton={() => setErrorAlert("")} />}

      <form onSubmit={onSubmitRegisterForm}>
        <div className="mb-2">
          <input className="bg-gray-50 border rounded-md w-full p-2" type="email" name="email" placeholder="foo@bar.com" required />
        </div>

        <div className="mb-2">
          <input className="bg-gray-50 border rounded-md w-full p-2" type="password" name="password" placeholder="password" required />
        </div>

        <div className="mb-5">
          <input className="bg-gray-50 border rounded-md w-full p-2" type="password" name="password_confirmation" placeholder="confirm your password" required />
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
