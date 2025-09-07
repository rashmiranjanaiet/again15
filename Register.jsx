import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student'); // student by default
  const navigate = useNavigate();
  async function handleRegister(e) {
    e.preventDefault();
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name });
    // create user doc
    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      email,
      role,
      photoURL: null,
      createdAt: serverTimestamp(),
      enrolledSubjects: []
    });
    if (role === 'student') navigate('/student');
    else if (role === 'teacher') navigate('/teacher');
    else navigate('/');
  }
  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
        <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input required type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border rounded">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-primary text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
