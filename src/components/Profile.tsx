import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Profile = () => {
  const supabaseClient = useSupabaseClient();

  const handleLogOut = () => supabaseClient.auth.signOut();

  return (
    <>
      <button onClick={handleLogOut}>logout</button>
    </>
  );
};

export default Profile;
