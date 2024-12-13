const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="bg-gradient-to-b from-[#70C3FF] via-[#70C3FF] to-[#266CA9]">
         <div className="flex flex-wrap min-h-screen w-full content-center justify-center py-10">
            <div className="flex flex-row rounded-lg bg-[#266CA9] w-[48rem] h-[32rem]">
            {children}
            </div>
         </div>
     </div>
   );
 };
 
 export default AuthLayout;
 