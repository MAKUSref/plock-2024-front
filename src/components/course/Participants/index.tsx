import { useGetCourseParticipantsQuery } from "@/redux/api/courseApi";
import { Input, List } from "antd";
import { useParams } from "react-router-dom";
import CHECKMARK_IMG from "@/assets/checkmark.png";
import { useMemo } from "react";
import { WhatsAppOutlined } from "@ant-design/icons";

const Participants = () => {
  const { id } = useParams<{ id: string }>();
  const { data: participants } = useGetCourseParticipantsQuery(id!);
  const users = useMemo(
    () => participants?.filter((p) => !p.attended),
    [participants]
  );

  return (
    <div className="mt-6 max-w-[400px]">
      <Input
        addonBefore={<WhatsAppOutlined />}
        placeholder="Link do grupy na whatsappie"
        allowClear
        defaultValue={"https://chat.whatsapp.com/JWBCCEADu8z9efX9C4Wo2I"}
      />

      <h5 className="mt-5">Liczba zapisanych osób: {participants?.length}</h5>
      <p className="mb-4">Obecni: {users?.length}</p>

      <List
        itemLayout="horizontal"
        dataSource={participants}
        renderItem={(item) => (
          <>
            <List.Item
              actions={[
                !item.attended ? (
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
