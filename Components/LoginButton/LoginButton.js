import { useSession, signIn, signOut } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-background">
        <button
          className="m-2 bg-btn font-medium  uppercase rounded-full px-6 py-2.5"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="bg-background flex flex-row flex-wrap justify-center">
      <button
        className="bg-btn font-medium m-3 uppercase rounded-full px-6 py-2.5 flex flex-row flex-wrap justify-center"
        onClick={() => signIn()}
      >
        <FaGithub size={25} color="black" />
        Sign in
      </button>
    </div>
  );
}
