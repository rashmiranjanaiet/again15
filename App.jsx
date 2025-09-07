import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentDashboard from './pages/Student/StudentDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          // default to student role – teacher/admin registrations should be handled separately
          await setDoc(ref, {
            name: u.displayName || u.email.split('@')[0],
            email: u.email,
            role: 'student',
            createdAt: serverTimestamp()
          });
          setUserDoc((await getDoc(ref)).data());
        } else {
          setUserDoc(snap.data());
        }
      } else {
        setUser(null);
        setUserDoc(null);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen">
      <Nav user={user} userDoc={userDoc} />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/student/*" element={
            <ProtectedRoute user={user} allowedRoles={['student']}>
              <StudentDashboard user={user} userDoc={userDoc} />
            </ProtectedRoute>
          } />

          <Route path="/teacher/*" element={
            <ProtectedRoute user={user} allowedRoles={['teacher']}>
              <TeacherDashboard user={user} userDoc={userDoc} />
            </ProtectedRoute>
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute user={user} allowedRoles={['admin']}>
              <AdminDashboard user={user} userDoc={userDoc} />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
