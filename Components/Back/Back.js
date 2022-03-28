import Link from 'next/link'
import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa';

function Back(pfad) {
  return (
    <div>
        <Link href={pfad.pfad}>
      <a>
      <div className="bg-background">
        <FaArrowCircleLeft size={50} color="white"/>
      </div>
      </a>
      </Link>
    </div>
  )
}

export default Back