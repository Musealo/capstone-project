import React from 'react';

function AnswerInput( props ) {
    const answerNumber = props.answerNumber
    console.log(answerNumber)
  return (
    <>
      <input
        autoComplete="off"
        type="text"
        id={answerNumber}
        name={answerNumber}
        className="bg-transparent border border-1 border-gray-300 text-center sadarounded-lg text-text w-screen mr-1"
        required
      />

      <input
        type="radio"
        name="answerCorrect"
        value={answerNumber}
        className="h-5 w-5"
        required
      />

      <label
        htmlFor={answerNumber}
        className="text-text absolute -top-1.5 w-full h-full pointer-events-none flex"
      ></label>
    </>
  );
}

export default AnswerInput;
