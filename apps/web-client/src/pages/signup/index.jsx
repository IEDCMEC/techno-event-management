import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/signup', {
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    router.push('/login');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </label>
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
