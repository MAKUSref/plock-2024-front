import SURVEY_IMG from "@/assets/survey.png";
import { Button } from "antd";

const SurveyBtn = () => {
  return (
    <Button
      className="py-8 px-6 w-full"
      icon={<img className="w-8 h-8" src={SURVEY_IMG} />}
    >
      Wypełnij ankietę!
    </Button>
  );
};

export default SurveyBtn;
