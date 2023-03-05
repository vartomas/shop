import { useProfile } from '@/hooks/useProfile';
import Button from './Button';
import TextInput from './TextInput';

const Profile = () => {
  const { profileForm, submit } = useProfile();

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
