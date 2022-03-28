import Link from 'next/link'
import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa';
import Router from 'next/router';

function Back(pfad) {
  return (
    <div>

      <div className="bg-background">
        <span onClick={() => Router.back()}><FaArrowCircleLeft size={50} color="white"/></span>
      </div>
    </div>
  )
}

export default Back