// import { auth } from "@/auth";
import { auth, currentUser } from '@clerk/nextjs/server'
import Board from "../../_components/board";
import { getBoards } from "@/lib/data-org";
import { OrganizationSwitcher } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const dashboard = async () => {
  const { userId, orgId} = await auth()
  // const session = await auth();

  if (!orgId) {
    return <div>Organization ID is missing or invalid</div>;
  }

    if (!orgId) {
      redirect("/select-org");
    }

  const boards = await getBoards(orgId);
  const orderBoard = [...boards]
  .sort((a, b) => {
    const orderA = new Date(a.createdAt).getTime(); // Convert to timestamp for comparison
    const orderB = new Date(b.createdAt).getTime(); // Convert to timestamp for comparison
    return orderB - orderA;
  });
  
  return (
    <div className="flex-1 p-6">
      {/* <h1 className="text-2xl">Dashboard</h1>
        <h2 className="text-xl">Welcome <span className="font-bold">{session?.user?.name}</span></h2>
        <pre>{JSON.stringify(session, null, 2)}</pre> */}

        <div className="grid grid-cols-4 gap-6 mt-6">
          {orderBoard.map((boardOrg) => (
            <Board key={boardOrg.id} id={boardOrg.id} name={boardOrg.name} boardBg={boardOrg.background} lastAccess={boardOrg.lastAccessed} />
          ))}

        </div>

    </div>
  );
};

export default dashboard;
