import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const userDoc = (await getDoc(doc(db, 'users', cred.user.uid))).data();
    if (userDoc?.role === 'teacher') navigate('/teacher');
    else if (userDoc?.role === 'student') navigate('/student');
    else if (userDoc?.role === 'admin') navigate('/admin');
    else navigate('/');
  }
  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input required type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-primary text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
