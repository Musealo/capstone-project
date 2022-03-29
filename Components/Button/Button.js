import Link from 'next/link';
import React from 'react';
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router'



function Button(path, btnText) {
  const { data: session} = useSession()
  const router = useRouter()
  
  const handleClick = (e) => {
    e.preventDefault()
    router.push(path.props)
  } 


  if (session) {
  return (
    <>
    <div className='bg-background'>
    <Link href={path.props} onClick={handleClick} passHref>
      <button className="bg-btn m-2 font-medium  uppercase rounded-full px-6 py-2.5">
        {path.btnText}
      </button>
    </Link>
    </div>
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