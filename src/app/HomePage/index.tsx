import SearchInput from "@/components/common/SearchInput";
import CourseCard from "@/components/course/CourseCard";
import HomeIntro from "@/components/home/Intro";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
<<<<<<< HEAD
import { Card, Skeleton } from "antd";
=======
import { Card, Skeleton, Tag } from "antd";
>>>>>>> 7fd4e22 (Display course)

const HomePage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery();

  return (
    <div>
      <HomeIntro />

      {isLoading && (
        <Card loading cover={<Skeleton.Image active />}>
          <Card.Meta title="Nazwa szkolenia" description="Opis szkolenia" />
        </Card>
      )}

      <div className="mt-20 grid grid-cols-3 gap-4">
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
