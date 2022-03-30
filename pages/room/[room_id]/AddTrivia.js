import React from 'react';
import Back from '../../../Components/Back/Back';
import CreateFriviaForm from '../../../Components/CreateFriviaForm/CreateFriviaForm';



function AddTrivia() {
  return (
    <div>
      <div className='bg-background'>
      <Back />
      </div>
      
      <div className="flex bg-background  gap-12 flex-col space-y-1.5 h-screen place-content-start w-auto shadow-xl text-center">
        <h1 className="bg-background text-text text-4xl">Add new Frivia</h1>

        <form className="w-full h-auto relative flex-col">
          <textarea id="newFrivia" name="newFrivia" className="w-full h-full text-text focus:outline-none px-3 pt-10 pb-10 mt-input-outline bg-transparent border border-1 border-gray-300 rounded-lg "></textarea>
          <label htmlFor='newFrivia' className="text-text absolute -top-1.5 w-full h-full pointer-events-none flex ">
            Question here
          </label>
          <h2 className='text-text'>Mark the correct answer</h2>
          <div className='flex flex-row flex-wrap gap-3 place-content-evenly'>
            <CreateFriviaForm />
            <CreateFriviaForm />
            <CreateFriviaForm />
            <CreateFriviaForm />
          </div>
          <div className='mt-10'>
          <button className='bg-btn font-medium  uppercase rounded-full px-6 py-2.5' type="submit">Submit</button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default AddTrivia;
