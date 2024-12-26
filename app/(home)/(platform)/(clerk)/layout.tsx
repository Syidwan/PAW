const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
   return (
     <div className="h-full flex flex-col items-center justify-center bg-muted-foreground text-blue-500 min-h-screen">
       {children}
     </div>
   );
 };
 
 export default ClerkLayout;
 