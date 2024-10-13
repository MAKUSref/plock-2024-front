import { useGetWordCloudByIdQuery } from "@/redux/api/wordCloudApi";
import PATHS from "@/router/paths";
import { message, QRCode } from "antd";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:5173";

const WordCloudPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: wordCloud, refetch } = useGetWordCloudByIdQuery(id!);
  const text = useMemo(() => {
    return `${BASE_URL}${PATHS.ADD_WORD_TO_CLOUD.replace(":id", id!)}`;
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 500);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [refetch]);

  const copy = () => {
    navigator.clipboard.writeText(text);
    message.success("Skopiowano link");
  };

  return (
    <div>
      <h1>{wordCloud?.question}</h1>
      <div>
        {wordCloud?.words.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
        <QRCode className="cursor-pointer" onClick={copy} value={text} />
      </div>
    </div>
  );
};

export default WordCloudPage;
