import React, { useEffect, useState } from 'react';

const Users = () => {
  // State to store the fetched users data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data after a 10-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, 10000); // 10000ms = 10 seconds delay

    // Cleanup the timer if the component unmounts before 10 seconds
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Render heading immediately, and only delay rendering of users list
  return (
    <div>
      <h1>Delayed Users</h1> {/* This will render immediately */}

      {loading ? (
        <h2>Loading users...</h2> // Show loading message only for the data
      ) : error ? (
        <h2>Error: {error}</h2> // Show error if something went wrong
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>{user.name}</h3>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
