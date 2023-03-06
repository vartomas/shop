import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '@/store/useUser';
import { UserProfile } from '@/types/userModel';

export const useProfileForm = () => {
  const { currentUser, loading, updateUser } = useUser();

  const profileForm = useForm<UserProfile>({
    mode: 'onSubmit',
    defaultValues: {
      firstname: currentUser?.firstname || '',
      lastname: currentUser?.lastname || '',
      adress: currentUser?.adress || '',
      city: currentUser?.city || '',
      country: currentUser?.country || '',
      phonenumber: currentUser?.phonenumber || '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      profileForm.reset({
        firstname: currentUser?.firstname || '',
        lastname: currentUser?.lastname || '',
        adress: currentUser?.adress || '',
        city: currentUser?.city || '',
        country: currentUser?.country || '',
        phonenumber: currentUser?.phonenumber || '',
      });
    }
  }, [currentUser, profileForm]);

  const submit = profileForm.handleSubmit((formValues) => {
    updateUser(formValues);
  });

  return {
    profileForm,
    loading,
    submit,
  };
};
