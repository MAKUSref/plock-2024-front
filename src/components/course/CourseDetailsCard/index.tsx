import SignInModal from "@/components/auth/SignInModal";
import {
  useGetCourseQuery,
  useGetMyCoursesQuery,
  useSignForCourseMutation,
} from "@/redux/api/courseApi";
import { useAuth, useUserRole } from "@/redux/selectors";
import { EnvironmentOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { Button, notification, QRCode } from "antd";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CourseMemberBtn from "./CourseMemberBtn";
import DownloadFilesBtn from "./DownloadFilesBtn";
import SurveyBtn from "./SurveyBtn";
import dayjs from "dayjs";

const CourseDetailsCard = () => {
  const { id } = useParams<{ id: string }>();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const { data: course } = useGetCourseQuery(id!);
  const isAuth = useAuth();
  const userRole = useUserRole();
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
              disabled={
                userRole === "admin" ||
                userRole === "lecturer" ||
                dayjs().isAfter(dayjs(course?.dateTime))
              }
              onClick={() =>
                isAuth ? handleSignForCourse() : setRegisterModalOpen(true)
              }
            >
              Zapisz się!
            </Button>
          )}
        </div>
        <div className="py-6 px-5">
          <p>{dayjs(course?.dateTime).format("DD MMMM YYYY")}</p>
          <h4 className="my-1">
            {dayjs(course?.dateTime).format("HH:mm")}
            {course?.duration && (
              <>
                {" - "}
                {dayjs(course?.dateTime)
                  .add(course?.duration ?? 0, "h")
                  .format("HH:mm")}
              </>
            )}
          </h4>
          <div className="flex items-center gap-3 pt-3">
            <div className="flex justify-center items-center rounded-full bg-primary bg-opacity-15 w-10 h-10 text-2xl">
              <FieldTimeOutlined className="text-primary bg-opacity-100" />
            </div>
            <p className="caption">{course?.duration} h</p>
          </div>
          <div className="flex items-center gap-3 pt-3">
            <div className="flex justify-center items-center rounded-full bg-primary bg-opacity-15 w-10 h-10 text-2xl">
              <EnvironmentOutlined className="text-primary bg-opacity-100" />
            </div>
            <p className="caption text-sm">Łukasiewicza 39, Płock</p>
          </div>
        </div>
      </div>
      {userRole === "user" && (
        <>
          <DownloadFilesBtn />
          <SurveyBtn />
        </>
      )}
      <div className="flex justify-center flex-col">
        <p className="pb-2 mt-10 px-10 text-center">
          <strong>Grupa</strong> informacyjna dla uczestników
        </p>
        <div className="flex justify-center">
          <QRCode
            size={200}
            value={"https://chat.whatsapp.com/JWBCCEADu8z9efX9C4Wo2I"}
            className="w-full"
            icon={"/whatsapp.png"}
            iconSize={40}
          />
        </div>
      </div>
      <SignInModal
        open={registerModalOpen}
        handleClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
};

export default CourseDetailsCard;
