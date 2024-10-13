import CourseFileUpload from "./CourseFileUpload";
import FileList from "./FileList";

const Files = () => {
  return (
    <>
      <p className="mt-10 mb-6">Tutaj znajdują się materiały z zajęć do pobrania</p>
      <div className="mb-6">
        <FileList />
      </div>
      <div className="mb-60">
        <CourseFileUpload />
      </div>
    </>
  );
};

export default Files;
