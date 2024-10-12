import { SearchOutlined } from "@ant-design/icons";
import { Input, Tag } from "antd";

const Intro = () => {
  return (
    <div className="">
      <div>
        <img
          src="/img/home-intro-top.svg"
          alt="..."
          className="absolute z-0 w-full top-0"
        />
      </div>
      <div className="container">
        <div className="h-[65vh] flex flex-col justify-end items-center">
          <h1>Baza szkoleń PPPT</h1>
          <p className="font-normal mb-12">
            Zbiór wszystkich szkoleń organizowanych przez Płocki Park
            Przemysłowo-Technologiczny.
          </p>
          <div className="max-w-[400px] w-full py-3">
            <Input
              className="w-full bg-primary bg-opacity-10"
              prefix={
                <SearchOutlined className="text-primary bg-opacity-100" />
              }
              placeholder="Wyszukaj szkolenie"
            />
          </div>
          <div className="flex gap-[10px] py-3 flex-wrap">
            <Tag
              bordered={false}
              color="purple"
              className="cursor-pointer font-semibold px-[10px]"
            >
              #biznes
            </Tag>
            <Tag
              bordered={false}
              color="blue"
              className="cursor-pointer font-semibold px-[10px]"
            >
              #AI
            </Tag>
            <Tag
              bordered={false}
              color="magenta"
              className="cursor-pointer font-semibold px-[10px]"
            >
              #ZdrowiePsychiczne
            </Tag>
            <Tag
              bordered={false}
              color="green"
              className="cursor-pointer font-semibold px-[10px]"
            >
              #Excel
            </Tag>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
