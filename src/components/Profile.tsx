import { FC } from 'react';
import { User } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/useProfile';
import Button from './Button';
import TextInput from './TextInput';

interface Props {
  user: User;
}

const Profile: FC<Props> = ({ user }) => {
  const { profileForm, fetching, submit } = useProfile(user.id);

  if (fetching) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={submit}>
        <TextInput name="firstname" label="First name" form={profileForm} />
        <TextInput name="lastname" label="Last name" form={profileForm} />
        <TextInput name="adress" label="Adress" form={profileForm} />
        <TextInput name="city" label="City" form={profileForm} />
        <TextInput name="country" label="Country" form={profileForm} />
        <TextInput name="phonenumber" label="Phone number" form={profileForm} />
        <div className="profile__submit-button-container">
          <Button type="submit" title="Save" disabled={profileForm.formState.isSubmitting} onClick={submit} />
        </div>
      </form>
    </div>
  );
};

export default Profile;
