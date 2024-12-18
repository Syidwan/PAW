import Navbar from "@/components/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			{children}
		</div>
	)
}
export default HomeLayout