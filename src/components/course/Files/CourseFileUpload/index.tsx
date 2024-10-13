import {
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/api/courseApi";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;

const CourseFileUpload = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course } = useGetCourseQuery(id || "");
  const [updateCourse] = useUpdateCourseMutation();

  console.log("course", course);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/file/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info);
        
        updateCourse({
          id: course?._id || "",
          course: {
            ...course,
            files: [...(course?.files || []), ...info.file.response],
          },
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Naciśnij lub przeciągnij plik na ten obszar
        </p>
        <p className="ant-upload-hint">Możesz przesłać wiele plików naraz</p>
      </Dragger>
      {/* {fileList.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button className="px-16">Zapisz</Button>
        </div>
      )} */}
    </>
  );
};

export default CourseFileUpload;
