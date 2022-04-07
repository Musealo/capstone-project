import React from 'react';

function AnswerInput(props) {
  const answerNumber = props.answerNumber;

  return (
    <>
      <input
        autoComplete="off"
        type="text"
        id={answerNumber}
        name={answerNumber}
        className="w-full bg-titelAndQuestion text-center text-text  rounded"
        required
      />

      <input
        type="radio"
        name="answerCorrect"
        value={answerNumber}
        className="h-5 w-5 accent-cor"
        required
      />

      <label
        htmlFor={answerNumber}
        className="text-text absolute   pointer-events-none flex"
      ></label>
    </>
  );
}

export default AnswerInput;
