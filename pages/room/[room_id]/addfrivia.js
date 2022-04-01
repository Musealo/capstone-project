import React from 'react';
import { useRouter } from 'next/router';
import BackButton from '../../../Components/BackButton/BackButton';

function AddTrivia() {
  const router = useRouter();
  const { room_id } = router.query;
  async function handleSubmit(event) {
    event.preventDefault();

    // get data from event object
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

    // fetch
    const response = await fetch('/api/frivia', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        question: friviaText,
        roomId: room_id,
        answers: JSON.stringify(answers),
        userAnswers: '',
      }),
    });
    const createdFrivia = await response.json();
    if (response.ok) {
      alert(`Created new frivia with id ${createdFrivia.data._id}`);
      event.target.reset();
    } else {
      alert(`Ooops — ${createdFrivia.error}`);
    }
  }
  return (
    <div>
      <div className="bg-background">
        <BackButton />
      </div>

      <div className="flex bg-background gap-12 flex-col h-screen  w-screen  text-center justify-center ">
        <h1 className="bg-background text-text text-4xl">Add new Frivia</h1>

        <div>
          <form
            onSubmit={handleSubmit}
            className="w-screen h-auto relative flex-col "
          >
    
            <textarea
              type="text"
              id="frivia"
              name="frivia"
              className="w-full h-full text-text focus:outline-none px-3 pt-10 pb-10 mt-input-outline bg-transparent border border-1 border-gray-300 rounded-lg "
            ></textarea>

            <label
              htmlFor="frivia"
              className="text-text absolute -top-1.5 w-full h-full pointer-events-none flex "
            >
              Question here
            </label>
          
            <h2 className="text-text">
              Give the user 4 possible answers and mark the right one
            </h2>
            <div>
            <div className="m-1 flex items-center mb-4">
              <input
                autoComplete="off"
                tpye="text"
                id="answer1"
                name="answer1"
                className="bg-transparent border border-1 border-gray-300 text-center sadarounded-lg text-text w-screen mr-1"
              />
              
              <input type="radio" name="answerCorrect" value="answer1" className='h-5 w-5'/>
              

              <label
                htmlFor="answer1"
                className="text-text absolute -top-1.5 w-full h-full pointer-events-none flex"
              ></label>
            </div>
            <div className="m-1 flex items-center mb-4">
              <input
                autoComplete="off"
                type="text"
                id="answer2"
                name="answer2"
                className="bg-transparent border border-1 border-gray-300 text-center sadarounded-lg text-text w-screen mr-1"
              />
              <input type="radio" name="answerCorrect" value="answer2" className='h-5 w-5' />
              <label
                htmlFor="answer2"
                className="text-text absolute -top-1.5 w-full h-full pointer-events-none flex "
              ></label>
            </div>
            <div className="m-1 flex items-center mb-4">
              <input
                autoComplete="off"
                type="text"
                id="answer3"
                name="answer3"
                className="bg-transparent border border-1 border-gray-300 text-center sadarounded-lg text-text w-screen mr-1"
              />
              <input type="radio" name="answerCorrect" value="answer3" className='h-5 w-5'/>
              <label
                htmlFor="answer3"
                className="text-text absolute -top-1.5 w-full h-full pointer-events-none flex "
              ></label>
            </div>
            <div className="m-1 flex items-center mb-4">
              <input
                autoComplete="off"
                type="text"
                id="answer4"
                name="answer4"
                className="bg-transparent border border-1 border-gray-300 text-center sadarounded-lg text-text w-screen mr-1"
              />
              <input type="radio" name="answerCorrect" value="answer4" className='h-5 w-5' />
              <label
                htmlFor="answer4"
                className="text-text absolute -top-1.5 w-full h-full pointer-events-none flex "
              ></label>
            </div>
            </div>
            <div className="mt-10">
              <button
                className="bg-btn font-medium  uppercase rounded-full px-6 py-2.5 "
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

