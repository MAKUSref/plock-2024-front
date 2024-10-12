import PATHS from "@/router/paths";
import { Course } from "@/types/course";
import { formatDate } from "@/utils/formatDate";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CourseCard = ({
  course: { _id, coverImgSrc, description, dateTime, title },
}: {
  course: Course;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl overflow-hidden cursor-pointer border hover:shadow-lg h-full flex flex-col "
      onClick={() => navigate(PATHS.COURSE.replace(":id", _id))}
    >
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
        <Link to={PATHS.COURSE.replace(":id", _id)}>
          <Button className="w-full" variant="outlined" color="primary">
            Zobacz więcej
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
