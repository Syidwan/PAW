import { auth } from "@/auth"
import Board from "@/components/board"


const dashboard = async() => {
   const session = await auth()
  return (
     <div className="flex-1 p-6">
        {/* <h1 className="text-2xl">Dashboard</h1>
        <h2 className="text-xl">Welcome <span className="font-bold">{session?.user?.name}</span></h2>
        <pre>{JSON.stringify(session, null, 2)}</pre> */}
        <div className="grid grid-cols-3 gap-6">
           <Board/>
        </div>
     </div>
  )
}

export default dashboard