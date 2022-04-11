import LoginButton from '../Components/LoginButton/LoginButton';
import { getSession } from 'next-auth/react';
import Button from '../Components/Button/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MainLogo from '/public/images/MainLogo.png';
import Head from 'next/head';

export default function Home() {
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
      <Head>
        <title>Frivia</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>❓</text></svg>"
        ></link>
      </Head>
      <div className="flex flex-col text-center">
        <Image
          src={MainLogo}
          alt="logo with frivia as text in it"
          width="100px"
          height="350px"
        />
        <div>
          <p className="text-text md:container md:mx-auto text-xl mt-5">
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
