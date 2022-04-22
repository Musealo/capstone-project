import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function Button({ children, ...rest }) {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        <div className=" px-6 py-2.5">
          <button
            {...rest}
            className="bg-btn m-2 text-text font-medium  uppercase rounded-full w-full px-6 py-2.5"
          >
            {children}
          </button>
        </div>
      </>
    );
  }
  return <p className="text-text ">Please log in to create a room</p>;
}
export default Button;
