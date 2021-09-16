import React, {useEffect} from 'react'
import {AdminLayoutRoute} from '../src/routes'
import Login from './Pages/Login/Login'
import { withRouter, Switch, Route ,Redirect } from "react-router-dom";
import Employee from './Pages/Employee/Employee';
function AdminRoutes(props) {

    const baseRoute = {
        path:"/",
        component:Employee
      }
    
      const loggedInUserBaseRoute = "/Employee";

    const isLoggedIn = () => {
        let token = localStorage.getItem('token');
    
        if(!token) return false
        else return true
      }

      function authenticateRoute (props) {
        let  path  = props.match.path;
      
        let user =JSON.parse(localStorage.getItem('User'))
       
        
       //  let isLoggedIn = isLoggedIn;
       let routeIndex = AdminLayoutRoute.findIndex(route => route.path === path);
      
       //console.log(user1.role)  
       if (path === "/" && isLoggedIn()) { 
         
         return <Redirect to={loggedInUserBaseRoute} />;
       }
       else if (path !== "/" && routeIndex !== -1 ) {
      
         const Component = AdminLayoutRoute[routeIndex].component;
         
       
         //use of nested tertiary operator
         return isLoggedIn() && user.role === 1 ? <Component {...props} /> : (isLoggedIn() && user.role === 3) ? <div> not found</div>: <Redirect to="/" />;
       }
       else {         
         const Component = baseRoute.component;
        
         return <Component {...props} />;
       }
     }

    return (
        <div>
            <Switch>
          {AdminLayoutRoute.map((route, index) => {
            return route.authenticate ? (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                render={authenticateRoute}
              />
            ) : (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            );
          })}          
        </Switch>
            
        </div>
    )
}

export default AdminRoutes
