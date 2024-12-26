"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modals/card-modal-org";
// import { ProModal } from "../modals/pro-modal";

export const ModalProviderOrg = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      {/* <ProModal /> */}
    </>
  );
};
