import Link from 'next/link';
import React from 'react';



function Button(path, btnText) {
  console.log(path)
  console.log(btnText)
  return (
    <>
    <Link href={path.props}>
      <button className="bg-btn font-medium  uppercase rounded-full px-6 py-2.5">
        {path.btnText}
      </button>
    </Link>
    </>
  );
}

export default Button;
