import { auth } from "@/auth";
import Board from "@/components/board";
import { getBoards } from "@/lib/data";

interface BoardType {
  id: string;
  name: string;
}

const dashboard = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <div>User is not authenticated</div>;
  }

  const boards = await getBoards(session.user.id);
  
  return (
    <div className="flex-1 p-6">
      {/* <h1 className="text-2xl">Dashboard</h1>
        <h2 className="text-xl">Welcome <span className="font-bold">{session?.user?.name}</span></h2>
        <pre>{JSON.stringify(session, null, 2)}</pre> */}

        <div className="grid grid-cols-3 gap-6 mt-6">
          {boards.map((board) => (
            <Board key={board.id} id={board.id} name={board.name} boardBg={board.background} lastAccess={board.lastAccessed} />
          ))}
        </div>

    </div>
  );
};

export default dashboard;
