import React from 'react';
import { motion } from 'framer-motion';

export default function SubjectCard({ subject, children }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="card">
      <h3 className="font-semibold">{subject.title} <span className="text-sm text-gray-400">({subject.code})</span></h3>
      <p className="text-sm text-gray-600 mt-2">{subject.description}</p>
      <div className="mt-3">{children}</div>
    </motion.div>
  );
}
