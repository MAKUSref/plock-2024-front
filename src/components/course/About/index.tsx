import { useGetCourseQuery } from "@/redux/api/courseApi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useParams } from "react-router-dom";

const About = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useGetCourseQuery(id!);

  return (
    <>
      <h3 className="mb-6 mt-10">O czym jest szkolenie?</h3>
      <p>{course?.description}</p>
      <h3 className="mt-20 mb-10">Prelegenci</h3>
      <div className="flex gap-20 text-center">
        {course?.lecturers.map((speaker, index) => (
          <div key={index} className="flex flex-col gap-3">
            <Avatar size={200} icon={<UserOutlined />} src={speaker.imgSrc} />
            <p className="font-semibold">
              {speaker.name} {speaker.surname}
            </p>
            <p>{speaker.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
