import SignInModal from "@/components/auth/SignInModal";
import {
  useGetMyCoursesQuery,
  useSignForCourseMutation,
} from "@/redux/api/courseApi";
import { useAuth } from "@/redux/selectors";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CourseMemberBtn from "./CourseMemberBtn";
import DownloadFilesBtn from "./DownloadFilesBtn";
import SurveyBtn from "./SurveyBtn";

const CourseDetailsCard = () => {
  const { id } = useParams<{ id: string }>();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const isAuth = useAuth();
  const { data: myCourses } = useGetMyCoursesQuery();

  const amICourseMember = useMemo(
    () => myCourses?.some((course) => course._id === id),
    [myCourses, id]
  );

  const [signForCourse] = useSignForCourseMutation();

  const handleSignForCourse = async () => {
    try {
      await signForCourse(id!).unwrap();
      notification.success({ message: "Zapisałeś się na szkolenie!" });
    } catch (error) {
      notification.error({ message: "Nie udało zapisac się na szkolenie" });
      console.log(error);
    }
  };

  return (
    <div className="-translate-y-[160px] flex flex-col gap-6">
      <div className="bg-white rounded-xl p-3 shadow-md ">
        <div>
          {amICourseMember && isAuth ? (
            <CourseMemberBtn />
          ) : (
            <Button
              className="text-xl py-7 rounded-lg font-semibold"
              type="primary"
              block
              onClick={() =>
                isAuth ? handleSignForCourse() : setRegisterModalOpen(true)
              }
            >
              Zapisz się!
            </Button>
          )}
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
      <DownloadFilesBtn />
      <SurveyBtn />
      <SignInModal
        open={registerModalOpen}
        handleClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
};

export default CourseDetailsCard;
