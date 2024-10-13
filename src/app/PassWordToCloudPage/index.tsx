import {
  useAddWordToWordCloudMutation,
  useGetWordCloudByIdQuery,
} from "@/redux/api/wordCloudApi";
import { Button, Input, message, notification } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PassWordToCloudPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: wordCloud } = useGetWordCloudByIdQuery(id!);
  const [word, setWord] = useState("");

  const [addWordToCloud] = useAddWordToWordCloudMutation();

  const handleAddWord = async () => {
    addWordToCloud({ word, wordCloudId: id! })
      .unwrap()
      .then(() => {
        notification.success({ message: "Udało się dodać frazę!" });
        setWord("");
      })
      .catch((error) => {
        message.error(error.data?.message);
      });
  };

  return (
    <div className="p-4 flex flex-col justify-center gap-24 pb-40 h-screen">
      <h3>{wordCloud?.question}</h3>
      <div className="flex flex-col gap-4">
        <Input size="large" placeholder="Wpisz frazę" value={word} onChange={(e) => setWord(e.target.value)} />
        <Button className="font-semibold py-6 text-lg" type="primary" onClick={handleAddWord}>Dodaj</Button>
      </div>
    </div>
  );
};

export default PassWordToCloudPage;
