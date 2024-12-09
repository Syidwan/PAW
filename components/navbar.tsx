import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  console.log(session);
  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image
            src="/logo-black.png"
            alt="logo"
            width={128}
            height={36}
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold ">
            <li className="text-gray-600 hover:text-gray-800">
              <Link href="/">Home</Link>
            </li>
            {session && (
              <>
                <li className="text-gray-600 hover:text-gray-800">
                  <Link href="/product">Product</Link>
                </li>
                <li className="text-gray-600 hover:text-gray-800">
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                {session.user.role === "admin" ? (
                  <li className="text-gray-600 hover:text-gray-800">
                    <Link href="/user">Users</Link>
                  </li>
                ) : null}
              </>
            )}
          </ul>
          {/* User Info */}
          {session && (
            <div className="flex gap-3 items-center">
              <div className="flex flex-col justify-center space-y-1">
                <span className="font-semibold capitalize text-gray-600 text-right">
                  {session.user.name}
                </span>
                <span className="font-xs capitalize text-gray-400 text-right">
                  {session.user.role}
                </span>
              </div>
              <button
                type="button"
                className="text-sm ring-2 bg-gray-100 rounded-full"
              >
                <Image
                  src={session.user.image || "/avatar.svg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </div>
          )}

          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
