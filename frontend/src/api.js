const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/api/users`);
  return res.json();
};

export const addUser = async (user) => {
  await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};
