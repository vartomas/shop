import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '@/store/useUser';
import { UserProfile } from '@/types/userModel';

const getValues = (currentUser: UserProfile | null) => ({
  firstname: currentUser?.firstname || '',
  lastname: currentUser?.lastname || '',
  adress: currentUser?.adress || '',
  city: currentUser?.city || '',
  country: currentUser?.country || '',
  phonenumber: currentUser?.phonenumber || '',
});

export const useProfileForm = () => {
  const { currentUser, updateUser } = useUser();

  const profileForm = useForm<UserProfile>({
    mode: 'onSubmit',
    defaultValues: getValues(currentUser),
  });

  useEffect(() => {
    if (currentUser) {
      profileForm.reset(getValues(currentUser));
    }
  }, [currentUser, profileForm]);

  const submit = profileForm.handleSubmit((formValues) => {
    updateUser(formValues);
  });

  return {
    profileForm,
    submit,
  };
};
