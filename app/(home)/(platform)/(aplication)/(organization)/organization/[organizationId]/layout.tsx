// components/DashboardLayout.tsx
import Navbar from "../../_components/navbar";
import Sidebar from "@/components/sidebar";
import ToastNotification from "@/components/toast-notification";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex bg-gradient-to-b from-[#70C3FF] via-[#70C3FF] to-[#266CA9] min-h-screen">
        {children}
      </div>
      <ToastNotification />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default DashboardLayout;
