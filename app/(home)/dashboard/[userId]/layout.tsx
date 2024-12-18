import Sidebar from "@/components/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-1">
			<Sidebar/>
				{children}
		</div>

	)
}
export default DashboardLayout