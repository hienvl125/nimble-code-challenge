import { signOut } from "next-auth/react"
import Link from "next/link"

export default function AlreadyLoggedInBox() {
  return (
    <main className="max-w-screen-sm border p-5 mx-auto mt-5 shadow-lg">
      <div className="mb-5">
        <h1 className="text-center text-xl mb-5">You are currently authenticated. To switch accounts, please proceed by logging out of the current session.</h1>
        <div>
          <Link
            href="/"
            type="submit"
            className="text-center text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 w-full mb-2"
          >
            Go to home page
          </Link>
          <button
            type="submit"
            className="text-red-700 border border-red-700 rounded-lg px-4 py-2 w-full hover:bg-red-50 hover:text-red-800"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
