import {
  useGetCourseQuery,
  useGetCourseSummarryQuery,
  useGetCourseSurveyesQuery,
} from "@/redux/api/courseApi";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import { Spin } from "antd";

const Survey = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useGetCourseQuery(id || "");
  const { data: summary, isLoading } = useGetCourseSummarryQuery(id || "");
  const { data: surveys } = useGetCourseSurveyesQuery("");

  const surveySummary = {
    returning: Array(2).fill(0),
    formOfCourse: Array(3).fill(0),
    practicalPart: Array(5).fill(0),
    expectations: Array(5).fill(0),
    expirience: Array(5).fill(0),
    learning: Array(5).fill(0),
    women: 0,
    men: 0,
  };

  surveys?.forEach((survey) => {
    if (survey.returning) {
      surveySummary.returning[1] += 1;
    } else {
      surveySummary.returning[0] += 1;
    }

    if (survey.formOfCourse === "Stacjonarnie") {
      surveySummary.formOfCourse[0] += 1;
    } else if (survey.formOfCourse === "Online") {
      surveySummary.formOfCourse[1] += 1;
    } else {
      surveySummary.formOfCourse[2] += 1;
    }

    if (survey.sex === "Kobieta") {
      surveySummary.women += 1;
    } else {
      surveySummary.men += 1;
    }

    surveySummary.practicalPart[survey.practicalPart - 1] += 1;
    surveySummary.expectations[survey.expectations - 1] += 1;
    surveySummary.expirience[survey.expirience - 1] += 1;
    surveySummary.learning[survey.learning - 1] += 1;
  });

  return (
    <div className="mt-10">
      <h3>Podsumowanie ankiet użytkowników</h3>
      <p>W ankiecie wzięło udział {surveys?.length}/{course?.participants.length}</p>

      <div className="flex flex-row flex-wrap pt-6">
        <div className="w-1/2 px-4 pb-20">
          <Chart
            options={{
              fill: {
                colors: ["#233588"],
              },
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: [1, 2, 3, 4, 5],
              },
            }}
            series={[
              {
                name: "Pytanie 1",
                data: [...surveySummary.expirience],
              },
            ]}
            type="bar"
          />
          <p className="text-center">
            Jak oceniasz Twoje wrażenia związane z udziałem w szkoleniu?
          </p>
        </div>
        <div className="w-1/2 px-4">
          <Chart
            options={{
              fill: {
                colors: ["#233588"],
              },
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: [1, 2, 3, 4, 5],
              },
            }}
            series={[
              {
                name: "Pytanie 1",
                data: [...surveySummary.learning],
              },
            ]}
            type="bar"
          />
          <p className="text-center">
            Jakbyś miał/a ocenić poziom wiedzy, jaką zdobyłeś/aś podczas
            szkolenia?
          </p>
        </div>
        <div className="w-1/2 px-4">
          <Chart
            options={{
              fill: {
                colors: ["#233588"],
              },
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: [1, 2, 3, 4, 5],
              },
            }}
            series={[
              {
                name: "Pytanie 1",
                data: [...surveySummary.practicalPart],
              },
            ]}
            type="bar"
          />
          <p className="text-center">
            Jak oceniasz część praktyczną szkolenia?
          </p>
        </div>
        <div className="w-1/2 px-4">
          <Chart
            options={{
              fill: {
                colors: ["#233588"],
              },
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: [1, 2, 3, 4, 5],
              },
            }}
            series={[
              {
                name: "Pytanie 1",
                data: [...surveySummary.expectations],
              },
            ]}
            type="bar"
          />
          <p className="text-center">
            Jak przeprowadzone szkolenie wpisało się w Twoje oczekiwania?
          </p>
        </div>
        <div className="w-1/2 mt-20">
          <Chart
            options={{
              fill: {
                colors: ["#359917", "#233588", "#7e8187"],
              },
              labels: ["STACJONARNE", "ONLINE", "BEZ ZNACZENIA"],
              chart: {
                id: "basic-bar",
              },
            }}
            series={[...surveySummary.formOfCourse]}
            type="donut"
          />
          <p className="text-center">
            Jak przeprowadzone szkolenie wpisało się w Twoje oczekiwania?
          </p>
        </div>

        <div className="w-1/2 mt-20">
          <Chart
            options={{
              fill: {
                colors: ["#359917", "#e01414"],
              },
              labels: ["Tak", "Nie"],
              chart: {
                id: "basic-bar",
              },
            }}
            series={[...surveySummary.returning]}
            type="donut"
          />
          <p className="text-center">
            Czy chciałbyś/chciałabyś uczestniczyć w przyszłych szkoleniach
            organizowanych przez tę samą firmę?
          </p>
        </div>
        <div className="w-full mt-20">
          <h4 className="">Podsumowanie ankiet (AI generated):</h4>
          {isLoading && <Spin />}
          <p className="text-base mt-6">
          {summary?.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Survey;
