import { useGetWordCloudByIdQuery } from "@/redux/api/wordCloudApi";
import PATHS from "@/router/paths";
import { getRandomColor } from "@/utils/getRandomColor";
import { message, QRCode, Spin, Tag } from "antd";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "http://192.168.143.52:5173";

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
    <div className="h-screen flex flex-row">
      <div className="w-3/5 h-full flex justify-center items-stretch">
        <div className="max-w-[800px] w-full border rounded-lg my-12 p-4 flex justify-between flex-col">
          <div>
            <h2>{wordCloud?.question}</h2>
            <div className="px-4 py-6 flex flex-row gap-4 flex-wrap scroll-auto">
              {wordCloud?.words.map((word, index) => (
                <Tag
                  color={getRandomColor()}
                  className="px-5 py-2 rounded-md text-3xl"
                  key={index}
                >
                  <span className="text-primary bg-opacity-100">{word}</span>
                </Tag>
              ))}
            </div>
            <div className="flex justify-center mt-3">
              <Spin size="large" />
            </div>
          </div>
          <div>{/* <Button type="primary">Zakończ</Button> */}</div>
        </div>
      </div>
      <div className="w-2/5 h-full bg-[#4E67DA] flex flex-col justify-center items-center">
        <div className="bg-white rounded-xl p-3">
          <QRCode
            size={400}
            className="cursor-pointer"
            onClick={copy}
            value={text}
          />
        </div>
        <p className="mt-4 text-xl text-white font-medium">
          Dołącz do chmurki skanując kod
        </p>
      </div>
    </div>
  );
};

export default WordCloudPage;
