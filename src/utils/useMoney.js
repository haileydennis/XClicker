import { useState, useEffect, useRef } from 'react';
import { doc, addDoc, collection, onSnapshot, setDoc, getFirestore } from 'firebase/firestore';

export const useMoney = () => {
  const [money, setMoney] = useState([]);
  const moneyRef = useRef([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, 'money'), (snapshot) => {
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
  }, []);


  const updateMoney = (money, dollar) => {
    const db = getFirestore();
      setDoc(doc(db, "money", money.id), {
        amount : money.amount + dollar,
      }, { merge : true });
  }

  const initMoney = async () => {
    const db = getFirestore();
    await addDoc(collection(db, "money"), {
      amount: 0,
      userId: "me",
    });
  }

  return [money, updateMoney, initMoney];
}