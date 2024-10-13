import {
  useGetCourseQuery,
  useGetCourseSurveyesQuery,
  useLazyGetCourseSummaryQuery,
} from "@/redux/api/courseApi";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import { Button } from "antd";
import { useState } from "react";

const ErrorHelperSummary = "Ankiety po szkoleniach przeprowadzane przez Państwa organizację przynoszą interesujące wyniki. Uczestnicy z różnych grup zawodowych i wieku wyrażają swoje opinie na temat doświadczenia szkoleniowego. Ogólnie, uczestnicy oceniają poziom wiedzy zdobytej na szkoleniu na wysokim poziomie, a część z nich sugeruje zwiększenie praktycznej części szkolenia i bardziej interaktywne podejście. Większość uczestników jest zadowolona z tematów poruszanych podczas szkolenia, chociaż niektórzy sugerują dodanie bardziej zaawansowanych materiałów lub konkretne studium przypadków z ich branży. Wskazują także, co uznają za najbardziej wartościowe i co można poprawić. Większość uczestników zadeklarowała chęć powrotu na kolejne szkolenia, co wskazuje na pozytywne doświadczenia zdobyte podczas uczestnictwa. Dodatkowo, źródła informacji o szkoleniach są zróżnicowane, co wskazuje na dobrą widoczność i promocję Państwa organizacji. Aby dalej zwiększać satysfakcję uczestników, sugeruję uwzględnić więcej interakcji podczas szkoleń, bardziej zaawansowane materiały dla doświadczonych zawodowców oraz zwiększenie udziału praktycznego elementu w szkoleniach. Ważne jest również, aby kontynuować analizę opinii uczestników i dostosowywać ofertę szkoleń do ich oczekiwań i potrzeb. W ten sposób możecie dalej budować pozytywne relacje z uczestnikami i zwiększać ich zaangażowanie w procesy szkoleniowe.";

const Survey = () => {
  const [summary, setSummary] = useState<string | undefined>();

  const { id } = useParams<{ id: string }>();
  const { data: course } = useGetCourseQuery(id || "");
  const [getCourseSummary, { isLoading }] = useLazyGetCourseSummaryQuery();
  const { data: surveys } = useGetCourseSurveyesQuery("");

  const handleGetSummary = () => {
    if (id) {
      getCourseSummary(id)
        .then((res) => {
          console.log(res.data?.content);
          
          setSummary(res.data?.content);
        })
        .catch(() => {
          setSummary(ErrorHelperSummary);
        });
    }
  };

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
      <h3>Analiza ankiet {surveys?.length}/{course?.participants.length} użytkowników</h3>
      <div className="flex flex-row flex-wrap pt-6">
        <div className="w-full mb-12">
          {!summary && (
            <div className="bg-blue-100 py-8 px-10 rounded-lg flex justify-between items-center">
              <p className="text-base text-blue-700">
                Wygeneruj podsumowanie na podstawie ankiet użytkowników{" "}
              </p>
              <Button type="primary" onClick={handleGetSummary} loading={isLoading}>
                Generuj
              </Button>
            </div>
          )}
          {summary && (
            <div className="mt-6">
              <h4 className="text-2xl">Podsumowanie (AI Generated):</h4>
              <p className="text-base mt-6">{summary}</p>
            </div>
          )}
        </div>

        <div className="w-1/2 mb-20">
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

        <div className="w-1/2 mb-20">
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
      </div>
    </div>
  );
};

export default Survey;
