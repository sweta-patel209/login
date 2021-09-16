import AdminRoutes from './AdminRoutes'

import Employee from './Pages/Employee/Employee'
import Login from './Pages/Login/Login'
import ForgotPassword from './Pages/ForgotPassword/ForgorPassword'
import SecondAdmin from './Pages/SecondAdmin/SecondAdmin'
import EmpDoc from './Pages/EmpDoc/EmpDoc'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import EmpDetail from './Pages/EmpDetail/EmpDetail'
import EmpList from './Pages/EmpList/EmpList'

const routes = [
    {
      path:"/",
      component:Employee,
      exact:true,
      authenticate:false
    },
    {
        path: "/login",
        component:Login,
        exact:true,
        authenticate:false,
      },
      //this routes are accessed by admin only
    {
        path:"/Employee",
        component:Employee,
        exact:true,
        authenticate:false
    },
    {
        path:"/Emplist",
        component:EmpList,
        exact:true,
        authenticate:false
    },
    
    {
        path:"/EmpDoc",
        component:EmpDoc,
        exact:true,
        authenticate:false
    },
    {
        path:"/EmpDetail/:id",
        component:EmpDetail,
        exact:true,
        authenticate:false
    },
    
    {
        path:"/ResetPassword",
        component:AdminRoutes,
        exact:true,
        authenticate:true
    },  
    
    {
        path:"/ForgotPassword",
        component:AdminRoutes,
        exact:true,
        authenticate:true
    },
    //this route is accessed by second admin only
    {
        path:"/Second",
        component:SecondAdmin,
        exact:true,
        authenticate:true
    }
]

export const AdminLayoutRoute = [
    {
        path:"/Employee",
        component:Employee,
        exact:true,
        authenticate:true
    },
    {
        path:"/EmpDoc",
        component:EmpDoc,
        exact:true,
        authenticate:true
    },
    {
        path:"/ResetPassword",
        component:ResetPassword,
        exact:true,
        authenticate:true
    },
    {
        path:"/ForgotPassword",
        component:ForgotPassword,
        exact:true,
        authenticate:true 
    }
]

export default routes