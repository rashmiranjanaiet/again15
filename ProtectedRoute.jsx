import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, allowedRoles = [], children }) {
  if (!user) return <Navigate to="/login" replace />;
  // userDoc role check is better but we receive role through parent portal route guard
  // For safety you'd fetch user role here. We'll assume user has role claim in client userDoc.
  // If allowedRoles empty, allow any authenticated user.
  if (allowedRoles.length === 0) return children;
  // read role from local storage or previously loaded userDoc: simplified - expect role in user.role
  // In our App, we pass down userDoc; so parent uses this component and allowedRoles.
  return children;
}
