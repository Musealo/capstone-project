import React from 'react';
import Back from '../../../Components/Back/Back';
import CreateFriviaForm from '../../../Components/CreateFriviaForm/CreateFriviaForm';
import { useRouter } from 'next/router';

function FriviaForm() {
  const router = useRouter();
  const { room_id } = router.query;
  async function handleSubmit(event) {
    event.preventDefault();
    // get data from event object
    const friviaText = event.target.elements.frivia.value;

    // fetch
    const response = await fetch('/api/frivia', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ text: friviaText, roomId: room_id }),
    });
    const createdFrivia = await response.json();
    if (response.ok) {
      alert(`Created new frivia with id ${createdFrivia.data._id}`);
    } else {
      alert(`Ooops — ${createdFrivia.error}`);
    }
  }

  return (
    <div>
      <div className="bg-background">
        <Back />
      </div>

      <div className="flex bg-background  gap-12 flex-col space-y-1.5 h-screen place-content-start w-auto shadow-xl text-center">
        <h1 className="bg-background text-text text-4xl">Add new Frivia</h1>

        <div>
          <form
            onSubmit={handleSubmit}
            className="w-full h-auto relative flex-col"
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
            <div className="mt-10">
              <button
                className="bg-btn font-medium  uppercase rounded-full px-6 py-2.5"
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

export default FriviaForm;
