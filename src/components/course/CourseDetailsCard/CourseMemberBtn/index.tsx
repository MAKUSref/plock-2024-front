import {
  useAmIPresentQuery,
  useCheckMyPresenceMutation,
} from "@/redux/api/courseApi";
import { Button } from "antd";
import { useParams } from "react-router-dom";

const CourseMemberBtn = () => {
  const { id } = useParams<{ id: string }>();

  const { data: amIPresent } = useAmIPresentQuery(id!);

  const [checkMyPresence] = useCheckMyPresenceMutation();

  const handleCheckMyPresence = async () => {
    try {
      await checkMyPresence({ courseId: id! }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!amIPresent ? (
        <Button
          className="text-lg py-7 rounded-lg font-semibold"
          type="primary"
          block
          onClick={handleCheckMyPresence}
        >
          Zaznacz swoją obecność
        </Button>
      ) : (
        <div className="py-7 border rounded-lg text-center text-green-800 font-semibold border-green-300 bg-green-100">
          Masz zaznaczoną obecność
        </div>
      )}
    </>
  );
};

export default CourseMemberBtn;
