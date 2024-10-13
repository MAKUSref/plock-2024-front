import DOWNLOAD_IMG from "@/assets/download.png";
import { Button } from "antd";

const DownloadFilesBtn = () => {
  return (
    <Button
      type="dashed"
      className="py-8 px-6 w-full"
      icon={<img className="w-8 h-8" src={DOWNLOAD_IMG} />}
    >
      Pobierz materiały do kursu
    </Button>
  );
};

export default DownloadFilesBtn;
