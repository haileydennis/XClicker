import { useState, useEffect, useRef } from 'react';
import { doc, addDoc, collection, onSnapshot, setDoc, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useMoney = () => {
  const [money, setMoney] = useState([]);
  const moneyRef = useRef([]);
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
    const unsubscribe = onSnapshot(collection(db, `money/${user.uid}/money`), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          moneyRef.current.push({ id: change.doc.id, ...change.doc.data() });
        }

        if (change.type === 'modified') {
          const index = moneyRef.current.findIndex((money) => money.id === change.doc.id);
          moneyRef.current[index] = { id: change.doc.id, ...change.doc.data() };
        }
      });
      setMoney([...moneyRef.current]);
    });

    return unsubscribe;
  }, [user]);


  const updateMoney = async (money, dollar, userId) => {
    const db = getFirestore();
      await setDoc(doc(db, `money/${userId}/money`, money.id), {
        amount : money.amount + dollar,
      }, { merge : true });
  }

  const initMoney = async (userId) => {
    const db = getFirestore();
    await addDoc(collection(db, `money/${userId}/money`), {
      amount: 0,
    });
  }

  return [money, updateMoney, initMoney];
}