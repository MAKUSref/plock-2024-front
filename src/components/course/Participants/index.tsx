import { useGetCourseParticipantsQuery } from "@/redux/api/courseApi";
import { List } from "antd";
import { useParams } from "react-router-dom";
import CHECKMARK_IMG from "@/assets/checkmark.png";
import { useMemo } from "react";

const Participants = () => {
  const { id } = useParams<{ id: string }>();
  const { data: participants } = useGetCourseParticipantsQuery(id!);
  const users = useMemo(
    () => participants?.filter((p) => p.presence),
    [participants]
  );

  return (
    <div className="mt-10 max-w-[400px]">
      <h5>Liczba zapisanych osób: {participants?.length}</h5>
      <p className="mb-4">Obecni: {users?.length}</p>

      <List
        itemLayout="horizontal"
        dataSource={participants}
        renderItem={(item) => (
          <>
            <List.Item
              actions={[
                !item.presence ? (
                  <img src={CHECKMARK_IMG} className="w-5 h-5" />
                ) : (
                  <div className="w-5 h-5 border border-slate-600 rounded-full" />
                ),
              ]}
            >
              <List.Item.Meta
                title={`${item.user.name} ${item.user.surname}`}
                description={item.user.description}
              />
            </List.Item>
          </>
        )}
      />
    </div>
  );
};

export default Participants;
