import { useGetCourseQuery } from "@/redux/api/courseApi";
import { CloudDownloadOutlined, FileTextFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useParams } from "react-router-dom";

const FileList = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useGetCourseQuery(id || "");

  return (
    <>
      {course?.files?.map((file, i) => (
        <div className="flex justify-between py-4 border-b">
          <div className="flex items-center gap-4">
            <FileTextFilled className="text-2xl" />
            <span>Plik {i + 1}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button target="_blank" href={file} download={`Plik ${i + 1}`}>
              Pobierz <CloudDownloadOutlined />
            </Button>
            <a
              key="list-loadmore-edit"
              className="text-red-500 hover:text-red-700"
            >
              Usuń
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default FileList;
