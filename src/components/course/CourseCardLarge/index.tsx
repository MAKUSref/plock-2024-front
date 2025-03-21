import PATHS from "@/router/paths";
import { Course } from "@/types/course";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const CourseCardLarge = ({ course }: { course: Course }) => {
  return (
    <div className="grid grid-cols-12 gap-8 border rounded-xl overflow-hidden">
      <div className="col-span-12 md:col-span-5">
        <div
          style={{ backgroundImage: `url(${course?.coverImgSrc})` }}
          className="w-full h-full bg-cover bg-center bg-no-repeat"
        ></div>
      </div>
      <div className="col-span-12 md:col-span-5 flex flex-col justify-between py-8">
        <div className="pb-10">
          <h4 className="text-3xl font-semibold pb-6">{course?.title}</h4>
          <p className="text-base">{course?.description}</p>
        </div>
        {!!course?.lecturers.length && (
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full  overflow-hidden flex justify-center items-center ">
              <img
                src={course?.lecturers[0].imgSrc}
                alt=""
                className="size-10 rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p>
                {course?.lecturers[0].name} {course.lecturers[0].surname}
              </p>
              <p>{course?.lecturers[0].description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-2 py-8 pr-8 flex flex-col justify-between">
        <div className="">
          <p className="text-sm">14 października 2024</p>
          <p className="font-semibold text-sm">18.30 - 20.00</p>
          <div className="flex items-center gap-3 pt-6">
            <div className="flex justify-center items-center rounded-full bg-primary bg-opacity-15 w-7 h-7 text-xl flex-grow-0 flex-shrink-0">
              <EnvironmentOutlined className="text-primary bg-opacity-100" />
            </div>
            <p className="caption text-sm">Łukasiewicza 39, Płock</p>
          </div>
        </div>
        <div>
          <Link to={PATHS.COURSE.replace(":id", course?._id)}>
            <Button className="font-semibold p-5" type="primary" block>
              Zobacz więcej
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCardLarge;
