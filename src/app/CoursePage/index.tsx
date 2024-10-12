import CourseDetailsCard from "@/components/course/CourseDetailsCard";
import { useGetCourseQuery } from "@/redux/api/courseApi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useGetCourseQuery(id || "");

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${course?.coverImgSrc})` }}
        className="relative flex items-end h-[50vh] w-full bg-no-repeat bg-center bg-cover"
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
          <div className="col-span-8 mt-20">
            <h3 className="mb-6">O czym jest kurs?</h3>
            <p>
              {course?.description} Many desktop publishing packages and web
              page editors now use Lorem Ipsum as their default model text, and
              a search for 'lorem ipsum' will uncover many web sites still in
              their infancy. Various versions have evolved over the years,
              sometimes by accident, sometimes on purpose (injected humour and
              the like).
            </p>
            <h3 className="mt-20 mb-10">Prelegenci</h3>
            <div className="flex gap-20 text-center">
              {course?.lecturers.map((speaker, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <Avatar size={200} icon={<UserOutlined />} />
                  <p className="font-semibold">{speaker.name}</p>
                  <p>{speaker.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 col-start-10">
            <CourseDetailsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
