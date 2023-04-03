import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user";
import { getUsers } from "../services/userService";

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [usersResponse] = await Promise.all([getUsers()]);
      setUsers(usersResponse);
    };
    fetchData();
  }, []);

  const renderUser = (user: IUser) => {
    return (
      <div key={user.id}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  };

  return <div>{users.map(user => renderUser(user))}</div>;
};
