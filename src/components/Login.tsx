import React, { useState, FormEvent } from "react";
import { useMe } from "./hooks/me";


export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const {logIn}=useMe();
  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await logIn({ email, password });
      setPassword("");
      setEmail("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={handleLogIn}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail((e.target as HTMLInputElement).value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword((e.target as HTMLInputElement).value)}
        />
      </label>
      <button>logIn</button>
    </form>
  );
};
