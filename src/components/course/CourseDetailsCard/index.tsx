import SignInModal from "@/components/auth/SignInModal";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const CourseDetailsCard = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl p-3 shadow-md -translate-y-2/3">
        <div>
          <Button
            className="text-xl py-7 rounded-lg font-semibold"
            type="primary"
            block
            onClick={() => setRegisterModalOpen(true)}
          >
            Zapisz się!
          </Button>
        </div>
        <div className="py-6 px-5">
          <p>14 października 2024</p>
          <h4 className="my-1">18.30 - 20.00</h4>
          <div className="flex items-center gap-3 pt-3">
            <div className="flex justify-center items-center rounded-full bg-primary bg-opacity-15 w-10 h-10 text-2xl">
              <EnvironmentOutlined className="text-primary bg-opacity-100" />
            </div>
            <p className="caption">Łukasiewicza 39, Płock</p>
          </div>
        </div>
      </div>
      <SignInModal
        open={registerModalOpen}
        handleClose={() => setRegisterModalOpen(false)}
      />
    </>
  );
};

export default CourseDetailsCard;
