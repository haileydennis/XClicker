import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useMoney } from '../utils/useMoney';
import { useMultipliers } from '../utils/useMultipliers';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [multipliers, updateMultiplier, initMultipliers] = useMultipliers();
  const [money, updateMoney, initMoney] = useMoney();
  const nav = useNavigate();
  const auth = getAuth();

  if (auth.currentUser) {
    nav('/');
  }

  const handleSignup = async () => {
    if (validateInput()) {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        initMoney(user.user.uid);
        initMultipliers(user.user.uid);
        setError('');
        nav('/');
      }
      catch (error) {
        setError(error.message);
      }
    }
  }

  const validateInput = () => {
    if (email === '' || password === '' || emailConfirmation === '' || passwordConfirmation === '') {
      setError('Please fill out all fields');
      return false;
    }

    if (email !== emailConfirmation) {
      setError('Email and email confirmation do not match');
      return false;
    }
    if (password !== passwordConfirmation) {
      setError('Password and password confirmation do not match');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    else {
      return true;
    }
  }

  return (
    <div>
      <div className="auth-form">
        <div className='login'>
          <p id="signup-text">Already have an account? Click <a href="/login">here</a> to login!</p>
          <input className="login-inputs" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input className="login-inputs" type="text" name="email" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} placeholder="confirm email" />
          <input className="login-inputs" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <input className="login-inputs" type="password" name="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="confirm password" />
          <button className="auth-btn" onClick={handleSignup}>SIGN UP</button>
          <p className='error-msg'> {error} </p>
        </div>
      </div>
    </div>
  );
}