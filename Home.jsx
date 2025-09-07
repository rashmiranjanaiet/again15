import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <motion.div initial={{ x:-40, opacity:0 }} animate={{ x:0, opacity:1 }}>
        <h1 className="text-4xl font-bold mb-3">Next-gen college portal</h1>
        <p className="mb-4 text-gray-600">Student/Teacher/Admin portals, attendance, grades, events, messaging, and more — powered by Firebase.</p>
        <div className="flex gap-3">
          <Link to="/register" className="px-4 py-2 bg-primary text-white rounded">Get Started</Link>
          <Link to="/login" className="px-4 py-2 border rounded">Login</Link>
        </div>
      </motion.div>
      <motion.div initial={{ x:40, opacity:0 }} animate={{ x:0, opacity:1 }} className="card">
        <h3 className="font-semibold mb-2">Quick demo data</h3>
        <ul className="text-sm text-gray-600">
          <li>• Register as student/teacher/admin</li>
          <li>• Teachers can create subjects, upload notes & assignments</li>
          <li>• Students enroll subjects, submit assignments, view gradebook</li>
          <li>• Admin can manage users, subjects, timetable & announcements</li>
        </ul>
      </motion.div>
    </div>
  );
}
