import { Provider } from "react-redux";
import { store } from "../redux/store";

import "dayjs/locale/pl";
import dayjs from "dayjs";
import Router from "@/router/Router";
import { ConfigProvider } from "antd";

dayjs.locale("pl");

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#233588",
          fontFamily: "Poppins, sans-serif",
        }
      }}
    >
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  );
};

export default App;
