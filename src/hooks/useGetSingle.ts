import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { PostgrestError } from '@supabase/supabase-js';

export const useGetSingle = <T>(from: string, eqField: string, eqValue: any) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabaseClient.from(from).select().eq(eqField, eqValue).single();
      if (data) {
        setData(data as T);
      }
      if (error) {
        setError(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return {
    data,
    error,
    loading,
  };
};
