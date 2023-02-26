import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm } from 'react-hook-form';
import { Database } from '@/types/supabase';
import { useGet } from './useGet';

export interface ProfileForm {
  firstname: string;
  lastname: string;
  adress: string;
  city: string;
  country: string;
  phonenumber: string;
}

export const useProfile = (userId: string) => {
  const supabaseClient = useSupabaseClient();

  const { data, loading } = useGet<[Database['public']['Tables']['profiles']['Row']]>('profiles', 'id', userId);

  const profileForm = useForm<ProfileForm>({
    mode: 'onSubmit',
    defaultValues: {
      firstname: '',
      lastname: '',
      adress: '',
      city: '',
      country: '',
      phonenumber: '',
    },
  });

  useEffect(() => {
    if (data) {
      const profile = data[0];
      profileForm.reset({
        firstname: profile.firstname || '',
        lastname: profile.lastname || '',
        adress: profile.adress || '',
        city: profile.city || '',
        country: profile.country || '',
        phonenumber: profile.phonenumber || '',
      });
    }
  }, [data, profileForm]);

  const submit = profileForm.handleSubmit(async (formValues: ProfileForm) => {
    await supabaseClient.from('profiles').update(formValues).eq('id', userId);
  });

  return {
    profileForm,
    loading,
    submit,
  };
};
