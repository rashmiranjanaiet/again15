import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import FileUploader from '../../components/FileUploader';

export default function TeacherDashboard({ user, userDoc }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [desc, setDesc] = useState('');
  const [mySubjects, setMySubjects] = useState([]);

  useEffect(()=>{ loadMySubjects(); }, []);
  async function loadMySubjects(){
    const q = query(collection(db,'subjects'), where('teacherId','==', user.uid));
    const snap = await getDocs(q);
    setMySubjects(snap.docs.map(d=>({id:d.id,...d.data()})));
  }

  async function createSubject(e){
    e.preventDefault();
    await addDoc(collection(db,'subjects'), {
      title, code, description: desc, teacherId: user.uid, createdAt: serverTimestamp()
    });
    setTitle(''); setCode(''); setDesc('');
    loadMySubjects();
    alert('Subject created');
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Teacher Portal — {userDoc?.name}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2">Create Subject</h3>
          <form onSubmit={createSubject} className="space-y-2">
            <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
            <input required value={code} onChange={e=>setCode(e.target.value)} placeholder="Code" className="w-full p-2 border rounded" />
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full p-2 border rounded"></textarea>
            <button className="bg-primary text-white p-2 rounded">Create</button>
          </form>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Upload Notes / Assignment</h3>
          <FileUploader user={user} />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">My Subjects</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {mySubjects.map(s => <div key={s.id} className="card"><strong>{s.title}</strong><div className="text-sm text-gray-600">{s.code}</div></div>)}
        </div>
      </div>
    </div>
  );
}
