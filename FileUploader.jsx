import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function FileUploader({ user }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert('Pick a file');
    const id = uuidv4();
    const stRef = ref(storage, `notes/${id}_${file.name}`);
    await uploadBytes(stRef, file);
    const url = await getDownloadURL(stRef);
    await addDoc(collection(db, 'notes'), {
      subjectId,
      title,
      fileURL: url,
      uploadedBy: user.uid,
      uploadedAt: serverTimestamp()
    });
    setFile(null); setTitle(''); setSubjectId('');
    alert('Uploaded');
  }
  return (
    <form onSubmit={handleUpload} className="space-y-2">
      <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
      <input value={subjectId} onChange={e=>setSubjectId(e.target.value)} placeholder="Subject ID (paste)" className="w-full p-2 border rounded" />
      <input required type="file" onChange={e=>setFile(e.target.files[0])} />
      <button className="bg-accent text-white p-2 rounded">Upload</button>
    </form>
  );
}
