import { getBoards } from '@/lib/data-org'; // Fungsi untuk mengambil data boards
import { BoardRecents } from './board'; // Komponen BoardRecents
import { GetServerSideProps } from 'next';

interface BoardListProps {
	userId: string;
	recentBoards: any[];// Menggunakan userId sebagai prop untuk komponen BoardList
}

const BoardList: React.FC<BoardListProps> = async ({ userId, recentBoards }) => {
  const error = "No boards open yet!"; // Variabel error
//   if (!recentBoards || recentBoards.length === 0) {
// 	return <div className="text-center text-gray-500">{error}</div>;
//  }

const sortedBoards = [...recentBoards]
  .sort((a, b) => {
    const dateA = a.lastAccessed ? new Date(a.lastAccessed) : new Date(0);
    const dateB = b.lastAccessed ? new Date(b.lastAccessed) : new Date(0);
    return dateB.getTime() - dateA.getTime(); // Descending order
  })
  .slice(0, 6); 

  return (
    <ul className="dropdown-content menu bg-base-100 rounded-md z-[1] w-64 p-2 shadow mt-3">
      {sortedBoards.length === 0 ? (
        <li className="text-center text-gray-500">{error}</li>
      ) : (
        sortedBoards.map((board) => (
          <li key={board.id}>
            <BoardRecents
					  id={board.id}
					  name={board.name}
					  boardBg={board.background}
					  lastAccess={board.lastAccessed}  
            />
          </li>
        ))
      )}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	
	const userId = Array.isArray(context.params?.userId)
	? context.params.userId[0]
	: context.params?.userId || '' // Ambil userId dari params atau fallback
	const recentBoards = await getBoards(userId); // Ambil data boards dari server
	return {
	  props: {
		 userId,
		 recentBoards,
	  },
	};
 };
 

export default BoardList;
