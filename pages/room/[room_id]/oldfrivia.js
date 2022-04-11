import React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import { FaSyncAlt } from 'react-icons/fa';
import Image from 'next/image';
import LogoOldFrivia from '../../../public/images/OldFrivia.png';

function OldFrivia() {
  const [frivias, setFrivias] = useState();
  const [highlightAnswer, setHighlightAnswer] = useState();

  async function fetchFrivias() {
    try {
      const response = await fetch('/api/frivia?includeCorrect=true');
      let friviasData = await response.json();
      friviasData = friviasData.filter(
        notAnswered => notAnswered.userAnswered === true
      );
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
    return fetchFrivias();
  }, []);

  return (
    <>
      <BackButton />
      {frivias ? (
        <div className="text-text text-center">
          <h1 className="text-text text-4xl bg-titelAndQuestion mb-6 mt-3">
            Old Frivia
          </h1>
          {frivias.map(frivia =>
            frivia.userAnswers.map(answer => (
              <div
                className="bg-cardBackground shadow-md p-5  w-auto h-auto w-auto mb-10"
                key={frivia._id}
              >
                <div className="flex flex-row gap-x-1">
                  <h3 className="text-titelAndQuestion">
                    {frivia.userId.name}
                  </h3>
                  <p className="text-text">asked:</p>
                </div>
                <p
                  className="bg-titelAndQuestion rounded-lg p-5 border font-medium w-auto h-auto"
                  key={frivia._id}
                >
                  {frivia.question}
                </p>
                <div className="flex mt-2">
                  <p className="text-text">Your answer was: {answer.value}</p>
                </div>
                <div className="mb-6 mt-3 grid gap-4 grid-cols-2">
                  {frivia.answers.map(answer =>
                    frivia.userAnswers.map(answered => (
                      <p
                        id={answer.value}
                        className={`mt-3 focus:animate-pulse bg-answerButton p-1 text-white 
                        ${answer.correct === true ? 'bg-correct' : 'bg-wrong'} 
                        ${
                          answered.value === answer.value
                            ? 'ring-4   ring-offset-4'
                            : ''
                        }
                      `}
                        key={answer.value}
                      >
                        {answer.value}
                      </p>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
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

export default OldFrivia;
