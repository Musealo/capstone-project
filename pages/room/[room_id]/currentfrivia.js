import React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import { FaSyncAlt } from 'react-icons/fa'


function CurrentFrivia() {
  const [frivias, setFrivias] = useState();
  useEffect(() => {
    async function fetchFrivias() {
      try {
        const response = await fetch('/api/frivia');
        const friviasData = await response.json();
        friviasData.map((frivia) => {
          frivia.answers = JSON.parse(frivia.answers)
          return frivia
        })
        setFrivias(friviasData);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchFrivias();
  }, []);

  
  
async function handleClick(correct, frivia_id, value) {
  console.log(frivia_id)
  console.log(value)
  const response = await fetch(`/api/frivia/${frivia_id}`, {
    method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ 
        userAnswers: value }),
  });
  }
  
  

  return (
    <>
      <BackButton />
      <div className="flex gap-12 flex-col space-y-1.5 h-screen place-content-center w-auto shadow-xl text-center">
        <div className="text-text">
          <h1 className="text-text text-4xl">Current Frivia</h1>
        </div>
        <div >
          {frivias ? (
            <div className="text-text">
              {frivias.map(frivia => (
                <div className="border p-5 rounded-tl-lg w-auto h-auto w-auto mb-10" key={frivia._id}>
                  <h3 className='flex place-self-start'>Question:</h3>
                  <p className="rounded-lg border font-medium w-auto h-auto" key={frivia._id}>
                    {frivia.question}
                  </p>
                  
                  <div className='flex justify-between flex-row mb-10 mt-3 flex-wrap'  >
                  {frivia.answers.map(answer=> (
                    <button name="userAnswers" onClick={() => {handleClick(answer.correct, frivia._id, answer.value)}} className="bg-btn p-1 rounded-full" key={answer.value}>{answer.value}</button>
                  ))}</div>
                </div>
              ))}
            </div>
          ) : ( <div className='flex text-text flex-row justify-center'><FaSyncAlt color="white" className='animate-spin '/>Loading…</div>
          )}
        </div>
      </div>
    </>
  );
}

export default CurrentFrivia;
