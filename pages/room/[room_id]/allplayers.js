import React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import { FaSyncAlt } from 'react-icons/fa';

function AllPlayer() {
  const [frivias, setFrivias] = useState();
  const [highlightAnswer, setHighlightAnswer] = useState();

  async function fetchFrivias() {
    try {
      const response = await fetch('/api/frivia?includeCorrect=true');
      let friviasData = await response.json();
      console.log(friviasData);
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
            All Player
          </h1>
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

export default AllPlayer;
