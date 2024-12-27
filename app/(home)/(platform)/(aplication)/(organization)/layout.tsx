import Navbar from "./_components/navbar";

const BoardLayout = ({ children }: { children: React.ReactNode }) => {

	return (
		<><Navbar/>
			{children}
		</>
	);
};

export default BoardLayout;