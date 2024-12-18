const Sidebar = () => {
  return (
	<aside className="bg-gray-200 w-1/5 p-4">
	<nav>
	  <ul>
		 <li className="mb-4">
			<button className="bg-[#041D56] text-white px-4 py-2 rounded w-full hover:bg-[#70C3FF]">Boards</button>
		 </li>
		 <li>
			<button className="px-4 py-2 rounded w-full hover:bg-[#70C3FF]">Home</button>
		 </li>
	  </ul>
	</nav>
 </aside>
  )
}

export default Sidebar