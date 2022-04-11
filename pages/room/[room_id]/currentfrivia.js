import React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import { FaSyncAlt } from 'react-icons/fa';
import Image from 'next/image';
import CurrentFrivias from '../../../public/images/CurrentFrivias.png';

function CurrentFrivia() {
  const [answerValue, setAnswerValue] = useState('');
  const [frivias, setFrivias] = useState();
  const [highlightAnswer, setHighlightAnswer] = useState();

  async function fetchFrivias() {
    try {
      const response = await fetch('/api/frivia');
      let friviasData = await response.json();
      friviasData = friviasData.filter(
        notAnswered => notAnswered.userAnswered === false
      );
      friviasData.map(frivia => {
        frivia.answers = frivia.answers.map(answer => {
          answer.correct = null;
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

  async function handleClick(frivia_id) {
    if (answerValue === '') {
      return alert('Pick an answer first');
    }

    const response = await fetch(`/api/frivia/${frivia_id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        selected: answerValue,
      }),
    });
    const data = await response.json();
    setHighlightAnswer(data);
    const friviasCopy = [...frivias];
    friviasCopy.map(frivia => {
      if (frivia_id === frivia._id) {
        frivia.answers = frivia.answers.map(answer => {
          answer.correct = answer.value === data.correct;
          return answer;
        });
      }
      return frivia;
    });
    setFrivias(friviasCopy);

    setTimeout(() => {
      fetchFrivias();
    }, 3000);
  }
  return (
    <>
      <BackButton />
      {frivias ? (
        <div className="text-text text-center">
          <h1 className="text-text text-4xl bg-titelAndQuestion mb-6 mt-3">
            Current Frivia
          </h1>
          {frivias.map(frivia => (
            <div
              className="bg-cardBackground shadow-md p-5  w-auto h-auto w-auto mb-10"
              key={frivia._id}
            >
              <div className="flex flex-row gap-x-1">
                <h3 className="text-titelAndQuestion">{frivia.userId.name}</h3>
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
                  <button
                    onClick={() => setAnswerValue(answer.value)}
                    id={answer.value}
                    className={`focus:bg-orange mt-3 focus:animate-pulse bg-answerButton p-1 text-white 
                    ${
                      answer.correct !== null
                        ? answer.correct
                          ? 'bg-correct'
                          : 'bg-wrong'
                        : ''
                    } 
                    `}
                    key={answer.value}
                  >
                    {answer.value}
                  </button>
                ))}
              </div>

              <div className="text-text">
                <button
                  name="userAnswers"
                  onClick={() => {
                    handleClick(frivia._id, answerValue);
                  }}
                  className="bg-orange w-full text-to"
                  type="submit"
                >
                  Submit
                </button>
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

export default CurrentFrivia;
