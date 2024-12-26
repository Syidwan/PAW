
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import CreateBoard from "./create-board";
import {SignOutButton} from "@/components/button";
import { BoardRecents } from "@/components/board";
import { getBoards } from "@/lib/data-org";
import BoardList from "./board-list";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  const {userId, orgId} = await auth();
  if (!userId || !orgId) {
    return <div>User is not authenticated</div>;
  }
  const boards = await getBoards(orgId);
  const recentBoard = boards
  return  (
    <nav className="w-full flex justify-between items-center bg-white p-2 shadow h-12 sticky top-0 z-10">
      <div className="flex items-center space-x-8 ml-6">
        <Link href={`/organization/${orgId}`}>
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
          <BoardList userId={orgId} recentBoards={recentBoard}/>
        </div>

        <div className="flex items-center space-x-0.5">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/select-org"}
          afterSelectOrganizationUrl={"/organization/:id"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
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
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />

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
  ) 
};

export default Navbar;
