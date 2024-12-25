
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import CreateBoard from "./create-board";
import {SignOutButton} from "./button";
import { BoardRecents } from "./board";
import { getBoards } from "@/lib/data";
import BoardList from "./board-list";

const Navbar = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return <div>User is not authenticated</div>;
  }
  const boards = await getBoards(session.user.id);
  const recentBoard = boards
  return session ? (
    <nav className="w-full flex justify-between items-center bg-white p-2 shadow h-12 sticky top-0 z-10">
      <div className="flex items-center space-x-8 ml-6">
        <Link href={`/dashboard/${session.user.id}`}>
          <Image
            src="/img/Logo.png"
            alt="PAW Logo"
            width={110}
            height={32}
            className="h-8 w-auto object-cover"
          />
        </Link>
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center space-x-0.5 hover:bg-blue-100 p-1 rounded-md"
          >
            <div className="px-2 py-1 text-sm ">Recent</div>
            <Image
              src="/img/drop.png"
              alt="Recent Icon"
              width={12}
              height={8}
              className="w-3 h-2"
            />
          </div>
          <BoardList userId={session.user.id} recentBoards={recentBoard}/>
        </div>

        <div className="flex items-center space-x-0.5">
          <Link
            href="/starred"
            className="px-2 py-1 text-sm hover:text-blue-500"
          >
            Starred
          </Link>
          <Image
            src="/img/drop.png"
            alt="Starred Icon"
            width={12}
            height={8}
            className="w-3 h-2"
          />
        </div>
        {/* <Link
          href="/create"
          className="bg-[#041D56] text-white px-3 py-1 rounded-lg ml-9 hover:bg-[#70C3FF]"
        >
          Create
        </Link> */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="bg-[#041D56] text-white px-3 py-1 rounded-lg ml-3 hover:bg-[#70C3FF]"
          >
            Create
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-md z-[1] w-64 p-2 shadow mt-3"
          >
            <CreateBoard/>
          </ul>
        </div>
      </div>
      <div className="flex items-center space-x-1 mr-4">
        <Link
          href="/notifications"
          className="hover:bg-gray-100 p-2 rounded-full"
        >
          <Image
            src="/img/notip.png"
            alt="Notifications"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
        <Link href="/help" className="hover:bg-gray-100 p-2 rounded-full">
          <Image
            src="/img/help.png"
            alt="Help"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <Image
              src={session.user.image || "/img/user.png"}
              alt="User"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-md z-[1] w-64 p-2 mt-2 shadow"
          >
            <div className="flex items-center p-4 border-b border-gray-200">
              <Image
                src={session.user.image || "/img/user.png"}
                alt="User"
                width={30}
                height={30}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-gray-800 font-semibold">
                  {session.user.name}
                </p>
                <p className="text-sm text-gray-500">{session.user.email}</p>
              </div>
            </div>
            <ul className="flex flex-col divide-y divide-gray-200">
              <li className="hover:bg-blue-100 px-4 py-2 cursor-pointer">
                Switch Account
              </li>
              <div className="hover:bg-blue-100 px-4 py-2 cursor-pointer">
                Theme
              </div>
                <SignOutButton />
            </ul>
          </ul>
        </div>
        {/* <form
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
        </form> */}
      </div>
    </nav>
  ) : (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image
            src="/img/Logo.png"
            alt="logo"
            width={128}
            height={36}
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold">
            <li className="text-gray-600 hover:text-gray-800">
              <Link href="/">Home</Link>
            </li>
          </ul>
          <Link
            href="/login"
            className="bg-[#041D56] text-white px-4 py-2 rounded-md hover:bg-[#70C3FF]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
