import Navbar from "@/components/navbar";
import NavbarBoard from "@/components/navbar-board";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="max-h-screen">
			<Navbar />
			
			  {children}
		 </div>
	);
};

export default BoardLayout;