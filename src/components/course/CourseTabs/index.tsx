import { Tabs, TabsProps } from "antd";
import About from "../About";
import Participants from "../Participants";
import Files from "../Files";
import Survey from "../Survey";

const TABS: TabsProps["items"] = [
  {
    key: "1",
    label: "O kursie",
    children: <About />,
  },
  {
    key: "2",
    label: "Lista obecności",
    children: <Participants />,
  },
  {
    key: "3",
    label: "Udostępnione materiały",
    children: <Files />,
  },
  {
    key: "4",
    label: "Ankieta końcowa",
    children: <Survey />,
  },
];

const CourseTabs = () => {
  return <Tabs defaultActiveKey="1" items={TABS} />;
};

export default CourseTabs;
