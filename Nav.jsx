import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { motion } from 'framer-motion';

export default function Nav({ user, userDoc }) {
  const navAnim = { hidden: { y: -10, opacity: 0 }, show: { y: 0, opacity: 1 } };
  const navigate = useNavigate();
  async function logout() {
    await signOut(auth);
    navigate('/');
  }
  return (
    <motion.nav initial="hidden" animate="show" variants={navAnim} className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">C</div>
          <span className="font-semibold">CollegeHub</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
          {!user && <>
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
            <Link to="/register" className="ml-2 px-3 py-1 rounded-md bg-primary text-white text-sm">Register</Link>
          </>}
          {user && userDoc && <>
            {userDoc.role === 'student' && <Link to="/student" className="text-sm">Student</Link>}
            {userDoc.role === 'teacher' && <Link to="/teacher" className="text-sm">Teacher</Link>}
            {userDoc.role === 'admin' && <Link to="/admin" className="text-sm">Admin</Link>}
            <button onClick={logout} className="ml-3 text-sm text-red-600">Sign out</button>
          </>}
        </div>
      </div>
    </motion.nav>
  );
}
