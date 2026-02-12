import React, { useEffect, useState } from "react";
import { fetchUsers, addUser } from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSubmit = async () => {
    await addUser({ name, email });
    const updated = await fetchUsers();
    setUsers(updated);
  };

  return (
    <div>
      <h1>Bikash Production Stack 🚀</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Add User</button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
