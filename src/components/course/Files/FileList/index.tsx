import { CloudDownloadOutlined, FileTextFilled } from "@ant-design/icons";
import { Button, List, Skeleton } from "antd";
import { useEffect, useState } from "react";


interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const FileList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res.results);
      });
  }, []);
  return (
    <List
      // className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button download={'/path/to/file'}>
              Pobierz <CloudDownloadOutlined />
            </Button>,
            <a
              key="list-loadmore-edit"
              className="text-red-500 hover:text-red-700"
            >
              Usuń
            </a>,
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              className="py-2"
              avatar={<FileTextFilled className="text-2xl" />}
              title={<a href="https://ant.design">{item.name?.last}</a>}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
}

export default FileList;