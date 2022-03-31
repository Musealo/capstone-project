import React from 'react'
import { useState, useEffect } from 'react'
import Back from '../../../Components/Back/Back'
import FriviaList from '../../../Components/FriviaList/FriviaList'

function CurrentFrivia() {
  const [frivias, setFrivias] = useState()
  useEffect(() => {
    async function fetchFrivias() {
      try {
        const response = await fetch("/api/frivia");
        const friviasData = await response.json();
        setFrivias(friviasData);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchFrivias();
  }, []);


  return (
    <>
    <Back pfad="/room"/>
    <div className='flex gap-12 flex-col space-y-1.5 h-screen place-content-center w-auto shadow-xl bg-background text-center'>
      <div className='text-text'>
      <h1 className="bg-background text-text text-4xl">Current Frivia</h1>
      </div>
      <div className='flex bg-background text-text flex-wrap'>
      {frivias ? (
          <div className='flex gap-10 text-text flex-col flex-wrap '>
            {frivias.map((frivia) => (
              <p className='border rounded-lg flex-wrap' key={frivia._id}>{frivia.text}</p>
            ))}
          </div>
        ) : (
          "Loading…"
        )}
        </div>
    </div>
    </>
  )
}

export default CurrentFrivia