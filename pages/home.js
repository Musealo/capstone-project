import LoginButton from '../Components/LoginButton/LoginButton';
import { getSession } from 'next-auth/react';
import Button from '../Components/Button/Button';
import { useRouter } from 'next/router';

export default function LandingPage() {
  const router = useRouter();

  async function handleCreateRoom() {
    const response = await fetch('/api/rooms', { method: 'POST' });
    const data = await response.json();
    const roomId = data.data._id;
    router.push(`room/${roomId}`);
    return;
  }

  return (
    <>
      <div className="flex gap-5 flex-col  text-center">
        <img
          className="gap-y-3.5 h-48 w-screen mx-auto"
          src="https://media.baamboozle.com/uploads/images/99452/1645324260_474325.jpeg"
          alt="placeholder"
        />
        <div className="gap-y-3.5 ">
          <h1 className=" m-10 text-titel md:mx-auto text-8xl">Frivia</h1>
          <p className="text-text md:container md:mx-auto text-xl">
            Play Trivia with Friends to get to know them better or to test how
            well you know each other
          </p>
        </div>
        <LoginButton />
        <Button onClick={handleCreateRoom}>Create a room</Button>
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
