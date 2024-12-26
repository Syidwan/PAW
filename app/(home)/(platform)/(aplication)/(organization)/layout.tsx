import Navbar from "./_components/navbar";
import NavbarBoard from "@/components/navbar-board";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<><Navbar/>
			{children}
		</>
	);
};

export default BoardLayout;