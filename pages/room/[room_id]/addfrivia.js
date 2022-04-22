import React from 'react';
import { useRouter } from 'next/router';
import BackButton from '../../../Components/BackButton/BackButton';
import AnswerInput from '../../../Components/AnswerInput/AnswerInput';
import Image from 'next/image';
import AddFriviaPage from '../../../public/images/AddFrivia.png';

function AddTrivia() {
  const router = useRouter();
  const { room_id } = router.query;
  async function handleSubmit(event) {
    event.preventDefault();

    const friviaText = event.target.elements.frivia.value;
    const answers = [];
    answers.push({
      value: event.target.elements.answer1.value,
      type: 'radio',
      correct: event.target.elements.answerCorrect.value === 'answer1',
    });
    answers.push({
      value: event.target.elements.answer2.value,
      type: 'radio',
      correct: event.target.elements.answerCorrect.value === 'answer2',
    });
    answers.push({
      value: event.target.elements.answer3.value,
      type: 'radio',
      correct: event.target.elements.answerCorrect.value === 'answer3',
    });
    answers.push({
      value: event.target.elements.answer4.value,
      type: 'radio',
      correct: event.target.elements.answerCorrect.value === 'answer4',
    });

    const response = await fetch(`/api/rooms/${room_id}/frivia`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        question: friviaText,
        roomId: room_id,
        answers: answers,
        userAnswers: [],
      }),
    });
    const createdFrivia = await response.json();
    if (response.ok) {
      event.target.reset();
    } else {
      alert(`Ooops — ${createdFrivia.error}`);
    }
  }

  return (
    <div>
      <BackButton />
      <div className="flex gap-y-1 flex-col mt-1  text-center">
        <div className="flex justify-center">
          <Image
            src={AddFriviaPage}
            alt="Add frivia cat logo"
            width="180"
            height="180"
          />
        </div>
        <div>
          <form className="flex flex-col gap-y-1" onSubmit={handleSubmit}>
            <label htmlFor="frivia" className="text-text ">
              Question here
            </label>
            <textarea
              type="text"
              id="frivia"
              name="frivia"
              className="bg-titelAndQuestion text-text rounded font-medium"
            ></textarea>

            <h3 className="text-text">
              Give the user 4 possible answers and mark the right one
            </h3>
            <div className="flex flex-col gap-y-6">
              <div className="flex gap-x-1 items-center">
                <AnswerInput answerNumber={'answer1'} />
              </div>
              <div className="flex gap-x-1 items-center">
                <AnswerInput answerNumber={'answer2'} />
              </div>
              <div className="flex gap-x-1 items-center">
                <AnswerInput answerNumber={'answer3'} />
              </div>
              <div className="flex gap-x-1 items-center">
                <AnswerInput answerNumber={'answer4'} />
              </div>
            </div>
            <div>
              <button
                className="bg-btn rounded-full font-medium  uppercase  px-6 py-2.5 "
                type="submit"
                value="Add frivia!"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTrivia;
