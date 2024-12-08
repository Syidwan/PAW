const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
         <div className="flex flex-col items-center justify-between px-6 py-8 mx-auto h-screen ">
            <div className="w-96 bg-white rounded-lg shadow mt-0 max-w-lg">
            {children}
            </div>
         </div>
     </div>
   );
 };
 
 export default AuthLayout;
 