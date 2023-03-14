import { FC } from 'react';
import { UserProfile } from '@/types/userModel';

interface Props {
  users: (UserProfile & { _id: string })[];
}

const UserList: FC<Props> = ({ users }) => {
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
          <span>{x.admin && 'yes'}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
