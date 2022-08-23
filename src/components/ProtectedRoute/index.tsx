import React, { Suspense } from 'react'
import { Navigate } from 'react-router';
import { Outlet } from 'react-router-dom';

interface Props {
  authenticated: boolean
  children?: JSX.Element
}

export default function ProtectedRoute({ authenticated, children }: Props): JSX.Element {
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
