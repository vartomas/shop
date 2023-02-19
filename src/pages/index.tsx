import { useState } from 'react';
import { supabaseBrowserClient } from '@/supabase/supabase';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => supabaseBrowserClient.auth.signUp({ email, password })}>create</button>
        <button onClick={() => supabaseBrowserClient.auth.signInWithPassword({ email, password })}>login</button>
        <button onClick={() => supabaseBrowserClient.auth.signOut()}>logout</button>
      </div>
    </>
  );
};

export default Home;
