import "./style.css";
import { Course } from "@/types/course";
import { formatDate } from "@/utils/formatDate";
import { Button } from "antd";

const CourseCardSmall = ({
  course: { coverImgSrc, description, dateTime, title },
}: {
  course: Course;
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden cursor-pointer border hover:shadow-lg h-full flex flex-col ">
      <div
        style={{ backgroundImage: `url(${coverImgSrc})` }}
        className="aspect-[4/3] lg:aspect-[5/3] relative w-full bg-no-repeat bg-center bg-cover"
      />
      <div className="p-5 flex flex-col justify-between col">
        <div>
          <p className="text-slate-500 text-sm ">{formatDate(dateTime)}</p>
          <h5 className="font-semibold text-lg mb-5 line-clamp-3">{title}</h5>
        </div>
        <p className="text-slate-800 line-clamp-3">{description}</p>
      </div>
      <div className="p-5">
        <Button className="w-full" variant="outlined" color="primary">
          Zobacz więcej
        </Button>
      </div>
    </div>
  );
};

export default CourseCardSmall;
