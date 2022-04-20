import { getProviders, getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SignIn({ providers }) {
  // you can use a hook like this to redirect the user after the login
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <>
      <div className="flex gap-12 mt-10 flex-col text-center">
        <h1 className="text-text">Sign In:</h1>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button
              className="bg-btn font-medium text-text uppercase rounded-full px-6 py-2.5"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession();
  return {
    props: { providers },
  };
}
