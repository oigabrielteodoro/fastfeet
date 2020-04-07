/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import AdminLayout from '~/pages/_layouts/admin';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  isEditor = false,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && (isPrivate || isEditor)) {
    return <Redirect to="/" />;
  }

  if (signed && !(isPrivate || isEditor)) {
    return <Redirect to="/orders" />;
  }

  const Layout =
    signed && isPrivate
      ? DefaultLayout
      : signed && isEditor
      ? AdminLayout
      : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout path={props.match.path}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  isEditor: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isEditor: false,
};
