import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const auth = getAuth();

  if (auth.currentUser) {
    nav('/');
  }

  const handleLogin = async () => {
    if (validateInput()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setError('');
        nav('/');
      }
      catch (error) {
        setError(error.message);
      }
    }
  }

  const validateInput = () => {
    if (email === '' || password === '') {
      setError('Please fill out all fields');
      return false;
    }
    else {
      return true;
    }
  }

  return (
    <div>
      <div className='auth-form'>
        <div className='login'>
          <p id="signup-text">New user? Click <a href="/signup">here</a> to sign up!</p>
          <input className="login-inputs" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input className="login-inputs" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button className="auth-btn" onClick={handleLogin}>LOGIN</button>
          <p className='error-msg'> {error} </p>
        </div>
      </div>
    </div>
  );
}