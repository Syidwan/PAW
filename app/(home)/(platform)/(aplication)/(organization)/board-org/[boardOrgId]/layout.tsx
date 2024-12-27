

const BoardLayout = async ({ children }: { children: React.ReactNode }) => {

	return (
		<><div className="max-h-screen">
			{children}
		</div></>
	);
};

export default BoardLayout;