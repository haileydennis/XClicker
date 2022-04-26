import { useState, useEffect, useRef } from 'react';
import { doc, addDoc, collection, onSnapshot, setDoc, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useMultipliers = () => {
  const [multipliers, setMultipliers] = useState([]);
  const multipliersRef = useRef([]);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);


  useEffect(() => {
    if (!user) return;
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, `multipliers/${user.uid}/multipliers`), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          multipliersRef.current.push({ id: change.doc.id, ...change.doc.data() });
        }

        if (change.type === 'modified') {
          const index = multipliersRef.current.findIndex((multiplier) => multiplier.id === change.doc.id);
          multipliersRef.current[index] = { id: change.doc.id, ...change.doc.data() };
        }
      });
      setMultipliers([...multipliersRef.current]);
    });
    return unsubscribe;
  }, [user]);


  const updateMultiplier = (multiplier, amount, userId) => {
    const db = getFirestore();
      setDoc(doc(db, `multipliers/${userId}/multipliers`, multiplier.id), {
        numberOwned : multiplier.numberOwned + amount,
      }, { merge : true });
  }

  const initMultipliers = async (userId) => {
    const db = getFirestore();
    await addDoc(collection(db, `multipliers/${userId}/multipliers`), {
      title: "A Little Xtra",
      numberOwned: 0,
      multiplier: 10,
    });

    await addDoc(collection(db, `multipliers/${userId}/multipliers`), {
      title: "Xtra Xtra",
      numberOwned: 0,
      multiplier: 50,
    });

    await addDoc(collection(db, `multipliers/${userId}/multipliers`), {
      title: "Xactly What I Needed",
      numberOwned: 0,
      multiplier: 100,
    });

    await addDoc(collection(db, `multipliers/${userId}/multipliers`), {
      title: "Moving Xtra Fast",
      numberOwned: 0,
      multiplier: 500,
    });
  }
  return [multipliers, updateMultiplier, initMultipliers];
}