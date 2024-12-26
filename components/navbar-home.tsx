import Link from 'next/link'
import React from 'react'
import Image from "next/image";
const NavbarHome = () => {
  return (
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
			href="/sign-in"
			className="bg-[#041D56] text-white px-4 py-2 rounded-md hover:bg-[#70C3FF]"
		 >
			Sign In
		 </Link>
	  </div>
	</div>
 </nav>
  )
}

export default NavbarHome