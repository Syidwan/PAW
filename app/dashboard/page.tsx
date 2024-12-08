import { auth } from "@/auth"

const dashboard = async() => {
   const session = await auth()
  return (
     <div className="max-w-screen-xl mx-auto py-6 p-4">
        <h1 className="text-2xl">Dashboard</h1>
        <h2 className="text-xl">Welcome <span className="font-bold">{session?.user?.name}</span></h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
     </div>
  )
}

export default dashboard