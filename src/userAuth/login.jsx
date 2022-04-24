import { useEffect, useState } from 'react';

export const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const user = localStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleLogin = () => {
    const user = {
      id: 'me',
      name: 'me',
      email: 'me',
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className='login'>
          <p id="signup-text">New here? Click here to signup!</p>
          <input className="login-inputs" type="text" name="email" placeholder="email" />
          <input className="login-inputs" type="password" name="password" placeholder="password" />
          <button className="login-btn" type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  );
}