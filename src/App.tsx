import { HashRouter, Route, Routes, Navigate} from "react-router-dom"; //要用什么功能记得挂载
import GetRouters from './router';
import { ConfigProvider } from 'antd';
import { createContext, useState } from "react";
interface MyContextType {
  identifyData: any;
  setIdentifyData: any;
  filename: any;
  setFilename: any;
}
export const MyContext = createContext<MyContextType | undefined>(undefined);
function App() {

  const [identifyData, setIdentifyData] = useState([])
  const [filename,setFilename] = useState('')
  return (
    <MyContext.Provider value={{identifyData, setIdentifyData,filename,setFilename}}>
    <div>
    {/* <ConfigProvider> */}
      <ConfigProvider theme={{ token: { colorPrimary: '#2ed573'}}}>
      <HashRouter>
        <GetRouters />
      </HashRouter>
      </ConfigProvider>
    </div>
    </MyContext.Provider>
  );
}

export default App;
