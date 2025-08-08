'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error getting session:", error);
      } else {
        console.log("Session on callback page:", session);
        router.replace('/');
      }
    });
  }, []);

  return <p></p>;
}