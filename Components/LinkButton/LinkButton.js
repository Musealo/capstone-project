import Link from 'next/link';
import React from 'react';

function LinkButton({ href, children }) {
  return (
    <>
      <Link href={href} passHref>
        <a className="bg-btn font-medium uppercase w-60 shadow-md rounded-full m-auto px-6 py-2.5">
          {children}
        </a>
      </Link>
    </>
  );
}
export default LinkButton;
