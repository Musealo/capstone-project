import Link from 'next/link';
import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function Button({ children, ...rest }) {
  const { data: session} = useSession()
  const router = useRouter()
    if (session){
  return (
    <>
      <div className="bg-background">
        <button
          {...rest}
          className="bg-btn m-2 font-medium  uppercase rounded-full px-6 py-2.5"
        >
          {children}
        </button>
      </div>
    </>
  )
  }
  return <p className='text-text '>Please log in to create a room</p>;
}
export default Button;

