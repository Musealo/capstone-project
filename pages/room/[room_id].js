
import { getSession } from 'next-auth/react';
import LinkButton from '../../Components/LinkButton/LinkButton';

import { useRouter } from 'next/router';
import BackButton from '../../Components/BackButton/BackButton';

export default function Room() {
  const router = useRouter();
  const { room_id } = router.query;
  return (
    <>
      <BackButton/>
      <div className="flex gap-12 flex-wrap flex-col space-y-1.5 h-screen place-content-center w-auto shadow-xl bg-background text-center ">
        <h1 className="text-text text-5xl">Room Menu</h1>
        <LinkButton href={`${room_id}/addfrivia`}>Add Trivia</LinkButton>
        <LinkButton href={`${room_id}/currentfrivia`}>Current Trivia</LinkButton>
        <LinkButton href={`${room_id}/OldTrivia`}>Old Trivia</LinkButton>
        <LinkButton href={`${room_id}/AllPlayers`}>All Players</LinkButton>
        <LinkButton href="Invite">Invite Player</LinkButton>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
