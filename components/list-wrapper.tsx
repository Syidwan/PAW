
interface ListWrapperProps {
	children: React.ReactNode
}

export const ListWrapper = ({
	children
}: ListWrapperProps) => {
	return (
		<li className="shrink-0 h-full w-[274px] select-none">
			{children}
		</li>
	)
}