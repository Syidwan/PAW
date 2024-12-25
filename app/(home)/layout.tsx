"use client"
import NavbarHome from "@/components/navbar-home";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname(); // Ambil pathname saat ini
	const isDashboardPage = pathname?.startsWith("/dashboard"); // Cek jika di halaman dashboard
	const isBoardPage = pathname?.startsWith("/board/"); // Cek jika di halaman board
	return (
		<SessionProvider>

		<div className="flex flex-col h-screen">
		{!isDashboardPage && !isBoardPage && <NavbarHome />}
			{children}
		</div>
		</SessionProvider>
	)
}
export default HomeLayout