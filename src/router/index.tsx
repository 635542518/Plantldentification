import * as React from "react";
import { useRoutes, RouteObject, Navigate} from "react-router-dom";
import Layout from '../views/layout'
import Home from '../views/home';
import Choose from '../views/choose'
import Login from '../views/login'
import Barplot from '../component/barplot'
import ImageRecognitionIndex from '../views/ImageRecognitionIndex'
import VideoRecognitionIndex from '../views/VideoRecognitionIndex'
import Select from '../views/select'

export const router_item:Array<object> = [
    {
        path: "/", 
        label:"首页", 
        key: "/",
        element:<Login/>
    },
    { 
        path: "/choose", 
        label:"首页", 
        key: "/",
        element: <Choose/>
    },
    { 
        path: "/login", 
        label:"登录", 
        key: "login",
        element: <Login/>
    },
    { 
        path: "/ImageRecognitionIndex", 
        label:"登录", 
        key: "login",
        element: <ImageRecognitionIndex/>
    },
    { 
        path: "/VideoRecognitionIndex", 
        label:"登录", 
        key: "login",
        element: <VideoRecognitionIndex/>
    },
    { 
        path: "/select", 
        label:"登录", 
        key: "login",
        element: <Select/>
    },
    {
        path: '/layout',
        element: <Layout />,
        label: " 控制台",
        key: "layout",
    },
    
]


const GetRouters = () => {
    const routes:any = useRoutes(router_item)
    return routes;
}

export default GetRouters;