import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
	const session = useSession();
	return (
		<nav className="bg-white shadow">
			<div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-3">
				<div>
					<span className="font-medium text-2xl text-blue-500">NGSA</span>
				</div>
				{
					session.status === "authenticated" ?
						(
							<ul className="flex">
								<li>
									<Link
										href="/keywords"
										className="border text-blue-600 border-blue-600 rounded-lg px-4 py-2 hover:bg-slate-50 hover:cursor-pointer mr-1"
									>
										Manage keywords
									</Link>
									<Link
										href="/login"
										className="text-white bg-red-600 rounded-lg px-4 py-2 hover:bg-red-700"
										onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
									>
										Logout
									</Link>
								</li>
							</ul>
						) :
						(
							<ul className="flex">
								<li>
									<Link
										href="/login"
										className="text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 mr-1"
									>
										Login
									</Link>
								</li>
								<li>
									<Link
										href="/register"
										className="border text-blue-600 border-blue-600 rounded-lg px-4 py-2 hover:bg-slate-50 hover:cursor-pointer"
									>
										Register
									</Link>
								</li>
							</ul>
						)
				}
			</div>
		</nav>
	)
}
