import "./style.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SearchInput = () => {
  return (
    <Input
      className="w-full text-lg md:mt-none rounded-full px-5 py-3 bg-[#F5F6FC] hover:bg-[#F5F7FF] border-none"
      prefix={<SearchOutlined className="text-primary bg-opacity-100 pr-2" />}
      placeholder="Wyszukaj szkolenie"
    />
  );
};

export default SearchInput;
