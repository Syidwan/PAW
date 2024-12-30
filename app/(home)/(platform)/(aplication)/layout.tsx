"use client"
import NavbarHome from "@/components/navbar-home";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname(); // Ambil pathname saat ini
	const isDashboardPage = pathname?.startsWith("/dashboard"); // Cek jika di halaman dashboard
	const isBoardPage = pathname?.startsWith("/board/"); // Cek jika di halaman board
	const isOrganizationPage = pathname?.startsWith("/organization/")
	const isBoardOrgPage = pathname?.startsWith("/board-org/");
	return (

		<div className="flex flex-col h-screen">
		{!isDashboardPage && !isBoardPage && !isOrganizationPage && !isBoardOrgPage && <NavbarHome />}
			{children}
		</div>
	)
}
export default HomeLayout