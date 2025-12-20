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
import HrRoute from './Authantication/HrRoute.jsx';
import MyProfile from './Dashboard/Employee/MyProfile/MyProfile.jsx';
import MainDashBoard from './Dashboard/Main/MainDashBoard.jsx';
import PrivateRoutes from './Authantication/PrivateRoutes.jsx';
import EmployeeRoutes from './Authantication/EmployeeRoutes.jsx';


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
   element:<PrivateRoutes>
    <DashBoardLayout></DashBoardLayout>
   </PrivateRoutes>,
    children:[
   {
    path:"/dashboard",
    Component:MainDashBoard
   }
   ,{
    path:"asset-list",
   element:<HrRoute>
   <AssetList></AssetList>
   </HrRoute>,  
  
    },
    {
      path:"add-asset",
      element:<HrRoute>
      <AddAsset></AddAsset>
      </HrRoute>,
      
    },
    {
      path:"all-request",
       element:<HrRoute><AllRequest></AllRequest></HrRoute>,
     
    },
    {
      path:"my-employee",
     element:<HrRoute>
     <MyEmployee></MyEmployee>
     </HrRoute>,
   
    },
    {
      path:"upgrade-package",
      element:<HrRoute>
      <UpgradePackage></UpgradePackage>
      </HrRoute>
      
    },
    {
      path:"my-profile",
      element:<EmployeeRoutes><MyProfile></MyProfile></EmployeeRoutes>
    },
    {
       path:"my-asset",
       element:<EmployeeRoutes><MyAsset></MyAsset></EmployeeRoutes>
     },
    {
       path:"request-asset",
       element:<EmployeeRoutes><RequestAsset></RequestAsset></EmployeeRoutes>
    },
    {
       path:"my-team",
      element:<EmployeeRoutes><MyTeam></MyTeam></EmployeeRoutes>
    },
    {
       path:"profile",
       element:<EmployeeRoutes><Profile></Profile></EmployeeRoutes>
      
    },
    {
      path:"package-payment-successful",
      Component:PaymentSuccessPage,
    },
    {
      path:"package-payment-declined",
      Component:PaymentDeclinedPage,
    },
    

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
