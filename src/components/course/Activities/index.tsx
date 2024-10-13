import { Avatar, Button, List } from "antd";
import { useParams } from "react-router-dom";
import { useGetWordCloudsQuery } from "@/redux/api/wordCloudApi";
import { PlayCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AddCloudWordModal from "./AddWordCloudModal";
import { useState } from "react";
import CLOUD from "@/assets/cloud.png";
import PATHS from "@/router/paths";
import { Link } from "react-router-dom";

const Activities = () => {
  const { id } = useParams<{ id: string }>();
  const { data: wordClouds } = useGetWordCloudsQuery({ courseId: id! });
  const [addWordCloudModalOpen, setAddWordCloudModalOpen] = useState(false);

  return (
    <div className="mt-10 max-w-[600px] ">
      <div className="flex items-center w-full mb-5 justify-between">
        <h5 className="font-medium text-lg">Chmurki słów</h5>
        <Button
          className="w-fit"
          icon={<PlusOutlined />}
          onClick={() => setAddWordCloudModalOpen(true)}
        />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={wordClouds}
        renderItem={(item) => (
          <>
            <List.Item
              actions={[
                <Link
                  to={PATHS.WORD_CLOUD.replace(":id", item._id)}
                  target="_blank"
                >
                  <Button type="text" icon={<PlayCircleOutlined />} />
                </Link>,
              ]}
            >
              <List.Item.Meta
                title={`${item.question}`}
                avatar={<Avatar src={CLOUD} />}
              />
            </List.Item>
          </>
        )}
      />
      <AddCloudWordModal
        onClose={() => setAddWordCloudModalOpen(false)}
        open={addWordCloudModalOpen}
      />
    </div>
  );
};

export default Activities;
