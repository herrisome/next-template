import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

import fetchJson from '@/lib/fetchJson';
import { User } from '@/pages/api/auth/user';

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const router = useRouter();
  const { data: user, mutate: mutateUser } = useSWR<User>(
    '/api/auth/user',
    fetchJson
  );

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo);
    }

    user.isLoggedIn &&
      localStorage.setItem(
        'loginFlag',
        JSON.stringify({ status: true, time: new Date() })
      );
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
