import Sidebar from "@/components/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		
		<div className="flex flex-1 bg-gradient-to-b from-[#70C3FF] via-[#70C3FF] to-[#266CA9]">
			<Sidebar/>
				{children}
		</div>

	)
}
export default DashboardLayout