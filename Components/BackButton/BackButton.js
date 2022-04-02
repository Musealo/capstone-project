import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa';
import Router from 'next/router';

function BackButton() {
  return (
    <div>

      <div className="bg-background">
        <span onClick={() => Router.back()}><FaArrowCircleLeft size={50} color="white"/></span>
      </div>
    </div>
  )
}

export default BackButton