import {
  useAddWordToWordCloudMutation,
  useGetWordCloudByIdQuery,
} from "@/redux/api/wordCloudApi";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PassWordToCloudPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: wordCloud } = useGetWordCloudByIdQuery(id!);
  const [word, setWord] = useState("");
  const [wordSent, setWordSent] = useState(false);

  const [addWordToCloud] = useAddWordToWordCloudMutation();

  const handleAddWord = async () => {
    addWordToCloud({ word, wordCloudId: id! })
      .unwrap()
      .then(() => {
        setWordSent(true);
      })
      .catch((error) => {
        message.error(error.data?.message);
      });
  };

  return (
    <div>
      <h1>{wordCloud?.question}</h1>
      <div>
        {wordSent && <p>Słowo zostało dodane</p>}
        <Input value={word} onChange={(e) => setWord(e.target.value)} />
        <Button onClick={handleAddWord}>Dodaj słowo</Button>
      </div>
    </div>
  );
};

export default PassWordToCloudPage;
