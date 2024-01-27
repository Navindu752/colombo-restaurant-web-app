import React from 'react';
import { Navigate } from 'react-router-dom';
import routerConstants from '../utils/routerConstants';

function ProtectedRoute({ element, path }) {
  const details = localStorage.getItem('userInfo');
  if (details) {
    const { accessToken } = JSON.parse(details)
    return accessToken ? element : <Navigate to={routerConstants.PERMISSION_DENIED} />
  } else {
    return <Navigate to={routerConstants.PERMISSION_DENIED} />
  }
}

export default ProtectedRoute;
