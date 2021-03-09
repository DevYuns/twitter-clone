import React, {useState} from 'react';
import {authService, firebaseInstance} from 'fbInstance';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (e) => {
    const {
      target: {
        name, value
      } 
    } = e;
    if(name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

  } 
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if(newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  }
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const {
      target: {
        name, value
      }
    } = e;
    let provider;
    if(name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input 
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log in'}/>
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  )
};

export default Auth;