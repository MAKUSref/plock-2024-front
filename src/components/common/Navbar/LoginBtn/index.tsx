import LoginModal from "@/components/auth/LoginModal";
import { useState } from "react";

const LoginBtn = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setLoginModalOpen(true)}
        className="text-primary bg-white py-2 px-5 rounded-md hover:cursor-pointer hover:shadow-md"
      >
        Zaloguj się
      </div>
      <LoginModal
        open={loginModalOpen}
        handleClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default LoginBtn;
