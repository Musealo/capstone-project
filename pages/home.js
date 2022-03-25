import Link from 'next/link';
import Button from '../Components/Button/Button';

export default function LandingPage() {
  return (
      <>
    <div className="flex flex-col space-y-1.5 h-screen w-auto shadow-xl bg-background text-center">
      <img
        className="gap-y-3.5 h-48 w-96 mx-auto bg-white "
        src="https://media.baamboozle.com/uploads/images/99452/1645324260_474325.jpeg"
        alt="placeholder"
      />
      <div className='gap-y-3.5'>
      <h1 className="m-10 text-text  md:mx-auto text-8xl">Frivia</h1>
      <p className=" text-text md:container md:mx-auto text-xl">
        Play Trivia with Friends to get to get to know them better or to test how
        good you know each other
      </p>
      </div>
      
          <br/>
          <p className='text-text'>Sign in with Github</p>
      <Button props="./room" btnText="Sign in"/>
      
      
      <Button props="./niklas" btnText="Create a room"/>
      
    </div>
    </>
  );
}
