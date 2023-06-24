import { HashRouter, Route, Routes, Navigate} from "react-router-dom"; //要用什么功能记得挂载
import GetRouters from './router';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <div>
      <ConfigProvider theme={{ token: { colorPrimary: 'white', borderRadius: 10 } }}>
      <HashRouter>
        <GetRouters />
      </HashRouter>
      </ConfigProvider>
  </div>
  );
}

export default App;
