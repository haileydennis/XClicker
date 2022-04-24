import { useState, useEffect, useRef } from 'react';
import { doc, addDoc, collection, onSnapshot, setDoc, getFirestore } from 'firebase/firestore';

export const useMultipliers = () => {
  const [multipliers, setMultipliers] = useState([]);
  const multipliersRef = useRef([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, 'multipliers'), (snapshot) => {
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
  }, []);


  const updateMultiplier = (multiplier, amount) => {
    const db = getFirestore();
      setDoc(doc(db, "multipliers", multiplier.id), {
        numberOwned : multiplier.numberOwned + amount,
      }, { merge : true });
  }

  const initMultipliers = async () => {
    const db = getFirestore();
    await addDoc(collection(db, "multipliers"), {
      title: "A Little Xtra",
      numberOwned: 0,
      multiplier: 10,
      userId: 'me',
    });

    await addDoc(collection(db, "multipliers"), {
      title: "Xtra Xtra",
      numberOwned: 0,
      multiplier: 50,
      userId: 'me',
    });

    await addDoc(collection(db, "multipliers"), {
      title: "Xactly What I Needed",
      numberOwned: 0,
      multiplier: 100,
      userId: 'me',
    });

    await addDoc(collection(db, "multipliers"), {
      title: "Moving Xtra Fast",
      numberOwned: 0,
      multiplier: 500,
      userId: 'me',
    });
  }

  return [multipliers, updateMultiplier, initMultipliers];
}