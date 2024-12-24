import Navbar from "@/components/navbar";
import NavbarBoard from "@/components/navbarBoard";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar />

			  {children}
		 </div>
	);
};

export default BoardLayout;