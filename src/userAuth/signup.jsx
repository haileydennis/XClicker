
export const Signup = () => {
  return (
    <div>
      <form onSubmit={console.log('hi!')}>
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