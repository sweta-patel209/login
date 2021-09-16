

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from './Pages/Login/Login'
import Employee from './Pages/Employee/Employee'
import routes from "./routes";
//import useToken from './useToken'

function App(props) {
  //const { token, setToken } = useToken();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

//   const baseRoute = {
//     path:"/",
//     component:Login
//   }

//   const loggedInUserBaseRoute = "/Employee";

//   const isLoggedIn = () => {
//     let token = localStorage.getItem('token');
//     console.log(token);
//     if(!token) return false
//     else return true
//   }

//   const authenticateRoute = (props) => {
//     let  path  = props.match.path;
//     console.log(path, 'path')
//     let user = localStorage.getItem('User')
   
//     let user1 = JSON.parse(user)
//     console.log(user1)
//    //  let isLoggedIn = isLoggedIn;
//    let routeIndex = routes.findIndex(route => route.path === path);
//    console.log('islogged IN---> ',isLoggedIn() )
//    console.log('PATH -----> ',path)  
//    //console.log(user1.role)  
//    if (path === "/" && isLoggedIn() && user1.role == 1 ) { 
//      console.log('hereeeeeee')
//      return <Redirect to={loggedInUserBaseRoute} />;
//    }
//    else if (path !== "/" && routeIndex !== -1) {
//      const Component = routes[routeIndex].component;
//      console.log('hereee')
//      return isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />;
//    }
//    else {
//      console.log('here')
//      const Component = baseRoute.component;
//      console.log(Component)
//      return <Component {...props} />;
//    }
//  }

  return (
    <>
    <BrowserRouter>
        <Switch>
        {routes.map((route, index) => {
         // console.log(route)
            return <Route
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          })}  
          
      
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
