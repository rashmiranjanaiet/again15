import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [annTitle, setAnnTitle] = useState('');
  const [annMsg, setAnnMsg] = useState('');
  useEffect(()=>{ loadUsers(); }, []);
  async function loadUsers(){
    const snap = await getDocs(collection(db,'users'));
    setUsers(snap.docs.map(d=>({id:d.id,...d.data()})));
  }
  async function createAnnouncement(e){
    e.preventDefault();
    await addDoc(collection(db,'announcements'), {
      title: annTitle, message: annMsg, createdAt: serverTimestamp(), createdBy: 'admin'
    });
    setAnnTitle(''); setAnnMsg('');
    alert('Announcement created');
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2">Users</h3>
          <ul className="text-sm text-gray-700">
            {users.map(u => <li key={u.id}>{u.name} — {u.email} — {u.role}</li>)}
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Create Announcement</h3>
          <form onSubmit={createAnnouncement} className="space-y-2">
            <input value={annTitle} onChange={e=>setAnnTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
            <textarea value={annMsg} onChange={e=>setAnnMsg(e.target.value)} placeholder="Message" className="w-full p-2 border rounded"></textarea>
            <button className="bg-primary text-white p-2 rounded">Publish</button>
          </form>
        </div>
      </div>
    </div>
  );
}
