import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const ClerkLayout = async ({ children }: { children: React.ReactNode }) => {
  const headersList = await headers()
	const pathname = headersList.get('x-pathname')
	
	// Jika path berubah, revalidate root
	if (pathname?.includes('/board-org')) {
	  revalidatePath('/')
	}
 
   return (
     <div className="h-full flex flex-col items-center justify-center bg-muted-foreground text-blue-500 min-h-screen">
       {children}
     </div>
   );
 };
 
 export default ClerkLayout;
 