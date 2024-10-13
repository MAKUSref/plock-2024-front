import "./style.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SearchInput = () => {
  return (
    <Input
      className="w-full text-2xl mt-10 md:mt-none rounded-full md:rounded-none bg-primary bg-opacity-10 border-none"
      size="large"
      prefix={<SearchOutlined className="text-primary bg-opacity-100" />}
      placeholder="Wyszukaj szkolenie"
    />
  );
};

export default SearchInput;
