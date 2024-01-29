import { useState } from "react";
import Link from "next/link";
import { useFlashMessage } from "@/context/FlashMessageContext";
import { useRouter } from "next/router";
import { signIn as nextAuthSignIn } from "next-auth/react";
import AlertMessage from "@/components/AlertMessage";

export default function Login() {
  const router = useRouter();
  const { flashMessage, setFlashMessage } = useFlashMessage();
  const [errorAlert, setErrorAlert] = useState<string>("");

  async function onSubmitLoginForm(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const emailValue = formData.get('email') as string;
    const passwordValue = formData.get('password') as string;

    const resp = await nextAuthSignIn("credentials", {
      email: emailValue,
      password: passwordValue,
      redirect: false,
    });

    if (resp?.error) {
      setErrorAlert("Invalid email or password");
      return;
    }

    setFlashMessage({ messageType: "success", messageContent: "Welcome to NGSA" });
    router.push("/");
  }


  return (
    <main className="max-w-96 border p-5 mx-auto mt-5 shadow-lg">
      <div className="mb-5">
        <h1 className="text-center font-medium text-4xl">NGSA</h1>
      </div>

      {flashMessage && <AlertMessage
        messageType={flashMessage.messageType}
        messageContent={flashMessage.messageContent}
        onClickCloseButton={() => setFlashMessage(null)}
      />}

      {errorAlert && <AlertMessage
        messageType="error"
        messageContent={errorAlert}
        onClickCloseButton={() => setErrorAlert("")}
      />}

      <form onSubmit={onSubmitLoginForm}>
        <div className="mb-2">
          <input className="bg-gray-50 border rounded-md w-full p-2" type="email" name="email" placeholder="foo@bar.com" required />
        </div>

        <div className="mb-5">
          <input className="bg-gray-50 border rounded-md w-full p-2" type="password" name="password" placeholder="password" required />
        </div>

        <button type="submit" className="text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 w-full">
          Login
        </button>
      </form>

      <div className="text-center mt-5 text-gray-500">
        Don't have account?
        &nbsp;
        <Link href="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
      </div>
    </main>
  )
}
