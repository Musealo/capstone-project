import Link from 'next/link';
import React from 'react';
import { useSession, getSession } from "next-auth/react"



function Button(path, btnText) {
  const { data: session} = useSession()
  
  if (session) {
  return (
    <>
    <Link href={path.props} passHref>
      <button className="bg-btn font-medium  uppercase rounded-full px-6 py-2.5">
        {path.btnText}
      </button>
    </Link>
    </>
  )
}
  return <p className='text-text '>Please log in to create a room</p>
}
export default Button;

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}