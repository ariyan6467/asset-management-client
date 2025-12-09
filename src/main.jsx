import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root.jsx';
import Home from './Page/Home/Home.jsx';

import HR from './Page/Authantication/HR/HR.jsx';
import Normal from './Page/Authantication/NormalPublic/Normal.jsx';
import EmployeeSignupForm from './Page/Authantication/Employee/Employee.jsx';
import Authprovider from './Authantication/Authprovider.jsx';
import WorkflowDashboard from './Dashboard/DashBoardLayout.jsx';
import DashBoardLayout from './Dashboard/DashBoardLayout.jsx';
import AssetList from './Dashboard/Manager/AssetList/AssetList.jsx';
import AddAsset from './Dashboard/Manager/AddAsset.jsx';
import AllRequest from './Dashboard/Manager/AllRequest.jsx';
import MyEmployee from './Dashboard/Manager/MyEmployee.jsx';
import UpgradePackage from './Dashboard/Manager/UpgradePackage.jsx';
import MyAsset from './Dashboard/Employee/MyAsset.jsx';
import RequestAsset from './Dashboard/Employee/RequestAsset/RequestAsset.jsx';
import MyTeam from './Dashboard/Employee/MyTeam.jsx';
import Profile from './Dashboard/Employee/Profile.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PaymentSuccessPage from './Dashboard/Manager/Payment/PaymentSuccess.jsx';
import PaymentDeclinedPage from './Dashboard/Manager/Payment/PaymentCancel.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
      {
       index:true,
       Component:Home
      },
      {
        path:"employee-login",
        Component:EmployeeSignupForm
      },
      {
        path:"hr-login",
        Component:HR
      },
      {
        path:"normal-login",
        Component:Normal
      }
    ]
  },
  {
    path:"dashboard",
    Component:DashBoardLayout,
    children:[
   {
    path:"/dashboard",
    Component:AssetList,  
    },
    {
      path:"add-asset",
      Component:AddAsset,
    },
    {
      path:"all-request",
      Component:AllRequest,
    },
    {
      path:"my-employee",
      Component:MyEmployee,
    },
    {
      path:"upgrade-package",
      Component:UpgradePackage
    },
    {
       path:"my-asset",
      Component:MyAsset
    },
    {
       path:"request-asset",
      Component:RequestAsset
    },
    {
       path:"my-team",
      Component:MyTeam
    },
    {
       path:"profile",
      Component:Profile
    },
    {
      path:"package-payment-successful",
      Component:PaymentSuccessPage,
    },
    {
      path:"package-payment-declined",
      Component:PaymentDeclinedPage,
    }

    ]

  }
]);

const queryClient =  new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider  client={queryClient}>
     <Authprovider>
       <RouterProvider router={router} />
    </Authprovider>
   </QueryClientProvider>
  </StrictMode>
)
