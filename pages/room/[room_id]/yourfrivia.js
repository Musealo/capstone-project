import React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import { FaSyncAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';

function YourFrivia() {
  const router = useRouter();
  const { room_id } = router.query;
  const [frivias, setFrivias] = useState();

  async function fetchFrivias() {
    try {
      const response = await fetch(
        `/api/rooms/${room_id}/frivia?youAsked=true`
      );
      let friviasData = await response.json();
      friviasData.map(frivia => {
        frivia.answers = frivia.answers.map(answer => {
          return answer;
        });

        return frivia;
      });

      setFrivias(friviasData);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (room_id) {
      fetchFrivias();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room_id]);

  return (
    <>
      <BackButton />
      {frivias ? (
        <div className="text-text text-center">
          <h1 className="text-text text-4xl bg-titelAndQuestion mb-6 mt-3">
            Your Frivia
          </h1>
          {frivias.map(frivia => (
            <div
              className="bg-cardBackground shadow-md p-5  w-auto h-auto w-auto mb-10"
              key={frivia._id}
            >
              <div className="flex flex-row gap-x-1">
                <h3 className="text-titelAndQuestion">You</h3>
                <p className="text-text">asked:</p>
              </div>
              <p
                className="bg-titelAndQuestion rounded-lg p-5 border font-medium w-auto h-auto"
                key={frivia._id}
              >
                {frivia.question}
              </p>

              <div className="mb-6 mt-3 grid gap-4 grid-cols-2">
                {frivia.answers.map(answer => (
                  <p
                    id={answer.value}
                    className={`mt-3 focus:animate-pulse bg-answerButton p-1 text-white`}
                    key={answer.value}
                  >
                    {answer.value}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex text-text flex-row justify-center">
          <FaSyncAlt color="white" className="animate-spin " />
          Loading…
        </div>
      )}
    </>
  );
}
export default YourFrivia;
