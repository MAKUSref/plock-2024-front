import About from "@/components/course/About";
import CourseDetailsCard from "@/components/course/CourseDetailsCard";
import CourseTabs from "@/components/course/CourseTabs";
import { useGetCourseQuery } from "@/redux/api/courseApi";
import { useUserRole } from "@/redux/selectors";
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useGetCourseQuery(id || "");
  const userRole = useUserRole();

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${course?.coverImgSrc})` }}
        className="relative flex items-end h-[70vh] w-full bg-no-repeat bg-center bg-cover"
      >
        <div className="absolute bg-black bg-opacity-60 w-full h-full top-0 left-0 bottom-0 right-0"></div>
        <div className="container relative pb-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-9">
              <h2 className="pb-10 text-white">{course?.title}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          {userRole === "admin" || userRole === "lecturer" ? (
            <div className="col-span-8 mt-20">
              <CourseTabs />
            </div>
          ) : (
            <div className="col-span-8 mt-20">
              <About />
            </div>
          )}

          <div className="col-span-3 col-start-10">
            <CourseDetailsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
