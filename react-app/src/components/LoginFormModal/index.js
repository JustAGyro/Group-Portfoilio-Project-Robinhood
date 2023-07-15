import React, { useState } from 'react';
import { login } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };
  const demoLogIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      history.push('/')
    }
  };
  return (
    <>
      <div className="login-signup-container">
        <h1 className="li-su-h1">Log In</h1>
        <div>
          <form className="login-signup-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Email
              <input
                className="login-signup-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                className="login-signup-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="sd-button-li-su" type="submit">
              Log In
            </button>
            <button className="sd-button-li-su" onClick={demoLogIn}>
              Demo User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
