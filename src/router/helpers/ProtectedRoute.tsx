import * as React from "react";
import { AUTHENTICATION_PATH } from "config/route";

import { Redirect, Route, RouteProps } from "react-router-dom";
import { getAccessToken } from "services/utils/auth";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const token = getAccessToken();
  if (!token) {
    return (
      <Redirect
        to={{
          pathname: AUTHENTICATION_PATH,
          state: { from: props.location },
        }}
      />
    );
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
