import React from 'react'
import Back from '../Components/Back/Back'




function currentfrivia() {
  return (
    <>
    <Back pfad="/room"/>
    <div className='flex gap-12 flex-col space-y-1.5 h-screen place-content-center w-auto shadow-xl bg-background text-center'>
      <div className='text-text'>
      <h1>Current Frivia</h1>
      </div>

    </div>
    </>
  )
}

export default currentfrivia