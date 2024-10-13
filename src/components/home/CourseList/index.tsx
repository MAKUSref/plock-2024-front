import SearchInput from "@/components/common/SearchInput";
import CourseCard from "@/components/course/CourseCard";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { Card, Divider, Empty, Skeleton, Tag } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

interface CourseTag {
  name: string;
  color: string;
  active: string;
}

const LoadingCards = () => (
  <>
    {Array.from({ length: 6 }).map((_, index) => (
      <Card key={index} loading cover={<Skeleton.Image active />}>
        <Card.Meta title="Nazwa szkolenia" description="Opis szkolenia" />
      </Card>
    ))}
  </>
);

const TAGS: CourseTag[] = [
  {
    name: "Marketing",
    color: "purple",
    active: "purple-inverse",
  },
  {
    name: "AI",
    color: "blue",
    active: "blue-inverse",
  },
  {
    name: "ZdrowiePsychiczne",
    color: "magenta",
    active: "magenta-inverse",
  },
  {
    name: "Excel",
    color: "green",
    active: "green-inverse",
  },
];

const CourseList = () => {
  const [searchText] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const { data: courses, isLoading } = useGetCoursesQuery({
    searchTag,
    searchText,
  });

  const months = useMemo(() => {
    const sortedMonths = [
      ...new Set(courses?.map((c) => dayjs(c.dateTime).month())),
    ].sort((a, b) => a - b);
    const indexOfNow = sortedMonths.indexOf(dayjs().month());

    const monthsBeforeNow = sortedMonths.slice(0, indexOfNow);
    const monthsAfterNow = sortedMonths.slice(indexOfNow);

    return [...monthsAfterNow, ...monthsBeforeNow];
  }, [courses]);

  console.log(months);

  const coursesGroupedByMonth = useMemo(() => {
    return months.map((month) => {
      return {
        month,
        courses: courses?.filter((c) => dayjs(c.dateTime).month() === month),
      };
    });
  }, [courses, months]);

  const handleSearchTag = (tag: string) => {
    if (searchTag === tag) {
      setSearchTag("");
      return;
    }
    setSearchTag(tag);
  };

  return (
    <>
      <div className="flex md:flex-col items-center gap-3 flex-col-reverse">
        <div className="max-w-[500px] w-full py-3">
          <SearchInput />
        </div>
        <div className="flex gap-1 py-3 flex-wrap justify-center">
          {TAGS.map((tag, i) => (
            <Tag
              key={i}
              bordered={false}
              color={tag.name === searchTag ? tag.active : tag.color}
              className="cursor-pointer px-[10px] text-base"
              onClick={() => handleSearchTag(tag.name)}
            >
              #{tag.name}
            </Tag>
          ))}
        </div>
      </div>

      <p className="mt-40 md:mt-6  text-center text-xs">
        {!!searchText && !!searchTag
          ? `Wyszukane szkolenia (${courses?.length}):`
          : `Wszystkie szkolenia (${courses?.length}):`}
      </p>
      {courses?.length === 0 && (
        <Empty className="mt-20" description="Nie znaleziono szkoleń" />
      )}
      <div className="">
        {isLoading && <LoadingCards />}
        {coursesGroupedByMonth.map(({ courses, month }, index) => (
          <div key={index}>
            <Divider className=" capitalize text-lg tracking-widest">
              {dayjs().month(month).format("MMMM")}
            </Divider>
            <div className="grid grid-cols-1 sm:grid-flow-col-2 md:grid-cols-3 gap-6">
              {courses?.map((course, i) => (
                <CourseCard key={i} course={course} />
              ))}
            </div>
          </div>
        ))}
        {/* {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))} */}
      </div>
    </>
  );
};

export default CourseList;
