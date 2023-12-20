import React, { useState } from 'react';
import { useRouter } from 'next/router';

import useLocalStorage from '@/hooks/useLocalStorage';
import { loginService } from '@/services/authenticationService';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useLocalStorage('token', null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await loginService({ email, password })) router.push('/dashboard');
    else console.error('Error when logging in');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="passwor"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
