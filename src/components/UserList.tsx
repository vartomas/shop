import { FC, useState } from 'react';
import { useToast } from '@/store/useToast';
import { UserProfile } from '@/types/userModel';
import { makeAdmin } from '@/utils/api/adminApi';
import Switch from './Switch';

interface Props {
  users: (UserProfile & { _id: string })[];
}

const UserList: FC<Props> = ({ users: initUsers }) => {
  const [users, setUsers] = useState(initUsers);
  const { toast } = useToast();

  const handleChange = async (id: string, value: boolean) => {
    const backup = [...users];
    setUsers((prev) => prev.map((x) => (x._id === id ? { ...x, admin: value } : x)));
    const response = await makeAdmin(id, !!value);
    if (response.error) {
      setUsers(backup);
      toast({ type: 'error', message: 'Failed to change admin role' });
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 && <span>No users to display.</span>}
      <div className="user-list__table-header user-list--row-grid">
        <span>Email</span>
        <span>Country</span>
        <span>First name</span>
        <span>Last name</span>
        <span>Admin</span>
      </div>
      {users.map((x) => (
        <div key={x._id} className="user-list__table-row user-list--row-grid">
          <span>{x.email}</span>
          <span>{x.country}</span>
          <span>{x.firstname}</span>
          <span>{x.lastname}</span>
          <span>
            <Switch value={!!x.admin} onChange={() => handleChange(x._id, !x.admin)} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
