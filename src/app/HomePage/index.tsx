import CourseCard from "@/components/course/CourseCard";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Skeleton, Tag } from "antd";

const HomePage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery();

  return (
    <div className="container">
      <div className="h-[60vh] flex flex-col justify-end items-center">
        <h1>Baza szkoleń PPPT</h1>
        <p className="font-normal mb-12">
          Zbiór wszystkich szkoleń organizowanych przez Płocki Park
          Przemysłowo-Technologiczny.
        </p>
        <div className="max-w-[400px] w-full py-3">
          <Input
            className="w-full bg-primary bg-opacity-10"
            prefix={<SearchOutlined className="text-primary bg-opacity-100" />}
            placeholder="Wyszukaj szkolenie"
          />
        </div>
        <div className="flex gap-[10px] py-3">
          <Tag
            bordered={false}
            color="purple"
            className="cursor-pointer font-semibold px-[10px]"
          >
            #biznes
          </Tag>
          <Tag
            bordered={false}
            color="blue"
            className="cursor-pointer font-semibold px-[10px]"
          >
            #AI
          </Tag>
          <Tag
            bordered={false}
            color="magenta"
            className="cursor-pointer font-semibold px-[10px]"
          >
            #ZdrowiePsychiczne
          </Tag>
          <Tag
            bordered={false}
            color="green"
            className="cursor-pointer font-semibold px-[10px]"
          >
            #Excel
          </Tag>
        </div>
      </div>

      {isLoading && (
        <Card loading cover={<Skeleton.Image active />}>
          <Card.Meta title="Nazwa szkolenia" description="Opis szkolenia" />
        </Card>
      )}

      <div className=" grid grid-cols-3 gap-4">
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
