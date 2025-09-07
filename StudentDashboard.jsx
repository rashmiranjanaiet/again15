import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import SubjectCard from '../../components/SubjectCard';

export default function StudentDashboard({ user, userDoc }) {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'subjects'));
      const snap = await getDocs(q);
      setSubjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  async function enroll(subjectId) {
    // add subjectId to user's enrolledSubjects array
    await updateDoc(doc(db, 'users', user.uid), {
      enrolledSubjects: arrayUnion(subjectId)
    });
    alert('Enrolled!');
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome, {userDoc?.name}</h2>
      <section className="grid md:grid-cols-3 gap-4">
        {subjects.map(s => (
          <SubjectCard key={s.id} subject={s}>
            <button className="mt-2 w-full bg-primary text-white p-2 rounded text-sm" onClick={() => enroll(s.id)}>Enroll</button>
          </SubjectCard>
        ))}
      </section>
    </div>
  );
}
