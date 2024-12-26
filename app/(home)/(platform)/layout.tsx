import { ClerkProvider } from '@clerk/nextjs'
 import '../../globals.css'
 const PlatformLayout = ({
	children,
 }: {
	children: React.ReactNode
 }) => {
	return (
	  <ClerkProvider afterMultiSessionSingleSignOutUrl="/">
		
			  {children}
	  </ClerkProvider>
	)
}
 
export default PlatformLayout;