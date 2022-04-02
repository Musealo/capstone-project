import Link from 'next/link';
import React from 'react';

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