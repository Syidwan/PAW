import React from "react";
import { getUsers } from "@/lib/data";
import { formatDate } from "@/lib/utils";
const UserTable = async () => {
  const users = await getUsers();
  if (!users?.length) return <h1>No User Data</h1>;
  return (
    <table className="w-full bg-white mt-3">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Email</th>
          <th className="py-3 px-6 text-left text-sm">Role</th>
          <th className="py-3 px-6 text-left text-sm">Created At</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="py-3 px-6">{user.name}</td>
            <td className="py-3 px-6">{user.email}</td>
            <td className="py-3 px-6">{user.role}</td>
				<td className="py-3 px-6">{ formatDate(user.createdAt.toString())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
