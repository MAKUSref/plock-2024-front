import { Tabs, TabsProps } from "antd";
import About from "../About";
import Participants from "../Participants";
import Files from "../Files";
import Survey from "../Survey";
import Icon from "@ant-design/icons";
import Activities from "../Activities";

const StarsSvg = () => (
  <svg
    fill="#000000"
    height="22px"
    width="22px"
    version="1.1"
    id="Icons"
    viewBox="0 0 32 32"
  >
    <g>
      <path
        d="M12,17c0.8-4.2,1.9-5.3,6.1-6.1c0.5-0.1,0.8-0.5,0.8-1s-0.3-0.9-0.8-1C13.9,8.1,12.8,7,12,2.8C11.9,2.3,11.5,2,11,2
   c-0.5,0-0.9,0.3-1,0.8C9.2,7,8.1,8.1,3.9,8.9C3.5,9,3.1,9.4,3.1,9.9s0.3,0.9,0.8,1c4.2,0.8,5.3,1.9,6.1,6.1c0.1,0.5,0.5,0.8,1,0.8
   S11.9,17.4,12,17z"
      />
      <path
        d="M22,24c-2.8-0.6-3.4-1.2-4-4c-0.1-0.5-0.5-0.8-1-0.8s-0.9,0.3-1,0.8c-0.6,2.8-1.2,3.4-4,4c-0.5,0.1-0.8,0.5-0.8,1
   s0.3,0.9,0.8,1c2.8,0.6,3.4,1.2,4,4c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c0.6-2.8,1.2-3.4,4-4c0.5-0.1,0.8-0.5,0.8-1
   S22.4,24.1,22,24z"
      />
      <path
        d="M29.2,14c-2.2-0.4-2.7-0.9-3.1-3.1c-0.1-0.5-0.5-0.8-1-0.8c-0.5,0-0.9,0.3-1,0.8c-0.4,2.2-0.9,2.7-3.1,3.1
   c-0.5,0.1-0.8,0.5-0.8,1s0.3,0.9,0.8,1c2.2,0.4,2.7,0.9,3.1,3.1c0.1,0.5,0.5,0.8,1,0.8c0.5,0,0.9-0.3,1-0.8
   c0.4-2.2,0.9-2.7,3.1-3.1c0.5-0.1,0.8-0.5,0.8-1S29.7,14.1,29.2,14z"
      />
      <path
        d="M5.7,22.3C5.4,22,5,21.9,4.6,22.1c-0.1,0-0.2,0.1-0.3,0.2c-0.1,0.1-0.2,0.2-0.2,0.3C4,22.7,4,22.9,4,23s0,0.3,0.1,0.4
   c0.1,0.1,0.1,0.2,0.2,0.3c0.1,0.1,0.2,0.2,0.3,0.2C4.7,24,4.9,24,5,24c0.1,0,0.3,0,0.4-0.1s0.2-0.1,0.3-0.2
   c0.1-0.1,0.2-0.2,0.2-0.3C6,23.3,6,23.1,6,23s0-0.3-0.1-0.4C5.9,22.5,5.8,22.4,5.7,22.3z"
      />
      <path
        d="M28,7c0.3,0,0.5-0.1,0.7-0.3C28.9,6.5,29,6.3,29,6s-0.1-0.5-0.3-0.7c-0.1-0.1-0.2-0.2-0.3-0.2c-0.2-0.1-0.5-0.1-0.8,0
   c-0.1,0-0.2,0.1-0.3,0.2C27.1,5.5,27,5.7,27,6c0,0.3,0.1,0.5,0.3,0.7C27.5,6.9,27.7,7,28,7z"
      />
    </g>
  </svg>
);

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
    label: "Aktywności",
    children: <Activities />,
    icon: <Icon style={{ fontSize: "32px" }} component={StarsSvg} />,
  },
  {
    key: "5",
    label: "Ankieta końcowa",
    children: <Survey />,
  },

  {
    key: "6",
    label: "Ustawienia",
  },
];

const CourseTabs = () => {
  return <Tabs defaultActiveKey="1" items={TABS} />;
};

export default CourseTabs;
