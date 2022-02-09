import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { store } from "store";
import ProtectedRoute from "./helpers/ProtectedRoute";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "./routes";

const NotFound = lazy(() => import("containers/exceptions/NotFound"));

const Router: React.FC<{}> = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<h3>Loading...</h3>}>
            <Switch>
              {/* PUBLIC ROUTES */}
              {Object.keys(PUBLIC_ROUTES).map((key: string) => {
                return (
                  <Route
                    key={key}
                    exact
                    path={PUBLIC_ROUTES[key].path}
                    component={PUBLIC_ROUTES[key].component}
                  />
                );
              })}
              {/* PROTECTED ROUTES */}
              {Object.keys(PROTECTED_ROUTES).map((key: string) => {
                return (
                  <ProtectedRoute
                    key={key}
                    exact
                    path={PROTECTED_ROUTES[key].path}
                    component={PROTECTED_ROUTES[key].component}
                  />
                );
              })}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default Router;
