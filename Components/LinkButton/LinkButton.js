import Link from 'next/link';
import React from 'react';
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router'



function LinkButton({href, children}) {
  return (
    <>
    <div className='bg-background'>
    <Link className="bg-background" href={href}  passHref>
      <a className="bg-btn font-medium  uppercase rounded-full px-6 py-2.5">
        {children}
      </a>
    </Link>
    </div>
    </>
  )
}
export default LinkButton;