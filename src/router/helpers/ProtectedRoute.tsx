import * as React from "react";
import { AUTHENTICATION_PATH } from "config/route";

import { Redirect, Route, RouteProps } from "react-router-dom";
import { getAccessToken } from "services/utils/auth";
import AuthLayout from "components/layouts/AuthLayout";

const ProtectedRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const token = getAccessToken();
  if (!token) {
    return <Redirect to={AUTHENTICATION_PATH} />;
  }
  return (
    <Route
      {...rest}
      render={() => (
        <AuthLayout>
          <Component />
        </AuthLayout>
      )}
    />
  );
};

export default ProtectedRoute;
