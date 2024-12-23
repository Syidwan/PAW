export default function Home() {
  return (
    
    <div
      className="flex flex-wrap h-screen w-full content-center justify-center bg-gradient-to-b from-[#70C3FF] via-[#70C3FF] to-[#266CA9]" 
    >
      <section className="text-left p-10 max-w-[600px] text-black ">
        <h1 className="text-[28px] font-bold mb-4">
          Bring all your tasks, teammates, and tools together
        </h1>
        <p className="text-sm text-[#333] mb-6">
          Keep everything in the same place, even if your team isnt
        </p>
        <a
          href="/register"
          className="inline-block bg-[#002855] text-white py-2 px-5 rounded text-base hover:bg-[#004080]"
        >
          Sign up
        </a>
      </section>
    </div>
  );
}
