import Button from '../Components/Button/Button';
import LoginButton from '../Components/LoginButton/LoginButton';
import { getSession } from "next-auth/react";
import Link from "next/link";
import { nanoid } from 'nanoid';


export default function LandingPage() {
  let roomid = nanoid()
  console.log(roomid)
  return (
      <>
    <div className="flex flex-col h-screen w-auto shadow-xl bg-background text-center">
      <img
        className="gap-y-3.5 h-48 w-96 mx-auto"
        src="https://media.baamboozle.com/uploads/images/99452/1645324260_474325.jpeg"
        alt="placeholder"
      />
      <div className='gap-y-3.5 bg-background'>
      <h1 className="bg-background m-10 text-text  md:mx-auto text-8xl">Frivia</h1>
      <p className="bg-background text-text md:container md:mx-auto text-xl">
        Play Trivia with Friends to get to know them better or to test how
        well you know each other
      </p>
      </div>
      <LoginButton />
      <Button props={`room/${roomid}`} btnText="Create a room"/>
    </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
