import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";


interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

export default function PrivateRoute({
  exact = false,
  path,
  component
}: IProps) {
  const token = localStorage.getItem("auth");
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (token != null) {
          return <Route {...props} component={withRouter(component)} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    
    />
  );
}