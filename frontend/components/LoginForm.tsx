import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3001/auth/login`, {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mt-24">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
