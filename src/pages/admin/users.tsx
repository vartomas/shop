import { FC } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import UserList from '@/components/UserList';
import { User } from '@/models/user';
import { UserProfile } from '@/types/userModel';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';
import Custom404Page from '../404';

interface Props {
  isAdmin: boolean;
  users: (UserProfile & { _id: string })[];
}

const Users: FC<Props> = ({ isAdmin, users }) => {
  if (!isAdmin) return <Custom404Page />;

  return (
    <div className="users-page">
      <Link href="products">
        <Button title="Manage products" />
      </Link>

      <Divider />

      <UserList users={users} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const token = context.req.cookies.token as string | undefined;

  if (token) {
    await connect();
    const user = await getAuthUser(token);

    if (!user?.admin) {
      return { props: { isAdmin: false, users: [] } };
    }

    const response = await User.find({});
    const users = response.map((x) => ({
      _id: x._id,
      email: x.email,
      firstname: x.firstname,
      lastname: x.lastname,
      adress: x.adress,
      city: x.city,
      country: x.country,
      phonenumber: x.phonenumber,
      admin: x.admin,
    }));

    return {
      props: {
        isAdmin: true,
        users: JSON.parse(JSON.stringify(users)),
      },
    };
  }

  return {
    props: { isAdmin: false },
  };
};

export default Users;
