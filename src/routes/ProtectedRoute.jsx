import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { authenticated, loading, user } = useSelector((state) => state.auth);
  // console.log(element);
  console.log({ ...rest });
  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (authenticated === false) {
              return <Navigate to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
