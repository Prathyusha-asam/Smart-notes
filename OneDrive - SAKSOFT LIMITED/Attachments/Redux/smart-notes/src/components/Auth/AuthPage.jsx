import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../store/authSlice';
import Threads from '../Threads/Threads';

export default function AuthPage() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!isLogin) {
  const pwd = form.password;
  const rules = [
    { test: pwd.length >= 8,          msg: 'At least 8 characters' },
    { test: /[A-Z]/.test(pwd),        msg: 'At least one uppercase letter (A-Z)' },
    { test: /[a-z]/.test(pwd),        msg: 'At least one lowercase letter (a-z)' },
    { test: /[0-9]/.test(pwd),        msg: 'At least one number (0-9)' },
    { test: /[^A-Za-z0-9]/.test(pwd), msg: 'At least one symbol (!@#$... etc)' },
  ];

  const failed = rules.find(r => !r.test);
  if (failed) {
    setError(`Password must have: ${failed.msg}`);
    return;
  }
}

    try {
      if (isLogin) dispatch(login({ username: form.username, password: form.password }));
      else dispatch(signup({ username: form.username, password: form.password }));
    } catch (err) {
      setError(err.message);
    }
  };

  const switchTab = (toLogin) => {
    setIsLogin(toLogin);
    setError('');
    setForm({ username: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="auth-page">
      <div className="threads-bg">
        <Threads
          color={[0.38, 0.4, 0.95]}
          amplitude={1.2}
          distance={0.3}
          enableMouseInteraction={true}
        />
      </div>

      <div className="auth-card">
        <div className="auth-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
        <h1 className="auth-title">Smart Notes</h1>
        <p className="auth-sub">Your intelligent note-taking space</p>

        <div className="auth-tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => switchTab(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => switchTab(false)}>Sign Up</button>
        </div>

        <form onSubmit={submit} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <input
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handle}
              required
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handle}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handle}
                required
                autoComplete="new-password"
              />
            </div>
          )}

          {error && (
            <div className="auth-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="auth-btn">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}