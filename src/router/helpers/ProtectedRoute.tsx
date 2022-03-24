import * as React from "react";
import { AUTHENTICATION_PATH } from "config/app";

import { Redirect, Route, RouteProps } from "react-router-dom";
import { getAccessToken } from "services/utils/auth";
import BaseLayout from "components/layouts/BaseLayout";
import ReservationLayout from "components/layouts/ReservationLayout";

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
      render={() => {
        switch (rest.layout) {
          case "reservation":
            return (
              <ReservationLayout>
                <Component />
              </ReservationLayout>
            );
          default:
            return (
              <BaseLayout>
                <Component />
              </BaseLayout>
            );
        }
      }}
    />
  );
};

export default ProtectedRoute;
