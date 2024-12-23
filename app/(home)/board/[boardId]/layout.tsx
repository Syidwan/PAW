import Navbar from "@/components/navbar";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar/>
			  {children}
		 </div>
	);
};

export default BoardLayout;