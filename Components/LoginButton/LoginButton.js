import { useSession, signIn, signOut } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className=" px-6 py-2.5">
        <button
          className="bg-btn font-medium uppercase w-60 shadow-md rounded-full m-auto px-6 py-2.5"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className=" flex flex-row flex-wrap justify-center">
      <button
        className="bg-btn font-medium uppercase w-60 shadow-md rounded-full m-auto px-6 py-2.5"
        onClick={() => signIn()}
      >
        <FaGithub size={25} color="black" />
        Sign in
      </button>
    </div>
  );
}
