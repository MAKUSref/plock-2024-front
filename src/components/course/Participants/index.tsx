import { useGetCourseParticipantsQuery } from "@/redux/api/courseApi";
import { List } from "antd";
import { useParams } from "react-router-dom";

const Participants = () => {
  const { id } = useParams<{ id: string }>();
  const { data: participants } = useGetCourseParticipantsQuery(id!);

  return (
    <div className="mt-10">
      <List
        itemLayout="horizontal"
        dataSource={participants}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.user.name}
              description={item.user.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Participants;
