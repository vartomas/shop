import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/store/useToast';
import { useUser } from '@/store/useUser';
import { UserProfile } from '@/types/userModel';

export const useProfile = () => {
  const { toast } = useToast();
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

  const submit = profileForm.handleSubmit(async (formValues) => {
    await updateUser(formValues);
    toast({ type: 'success', message: 'Profile updated' });
  });

  return {
    profileForm,
    loading,
    submit,
  };
};
