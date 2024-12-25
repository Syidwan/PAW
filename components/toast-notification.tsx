"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ToastNotification = () => {
  useEffect(() => {
    // Periksa apakah cookie 'showToast' ada dan bernilai 'true'
    const showToast = Cookies.get("deleteBoard");

    if (showToast === "true") {
      toast.success("Board has been successfully deleted!", {
        position: "top-right",
			autoClose: 3000,
			onClose: () => {
				// Hapus cookie setelah toast selesai
				Cookies.remove("deleteBoard");
			 },
      });

      // Hapus cookie setelah menampilkan toast agar tidak muncul lagi
      Cookies.remove("showToast");
    }
  }, []);

  return null; // Tidak merender apa pun, hanya menjalankan efek samping
};

export default ToastNotification;
