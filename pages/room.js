import Button from '../Components/Button/Button';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Link from 'next/link';
import Back from '../Components/Back/Back';
import { getSession } from 'next-auth/react';

export default function Room() {
  return (
    <>
     <Back pfad="/"/>
      <div className="flex gap-12 flex-col space-y-1.5 h-screen place-content-center w-auto shadow-xl bg-background text-center">
        <h1 className="text-text text-5xl">Room Menu</h1>
        <Button props="AddTrivia" btnText="Add Trivia" />
        <Button props="currentfrivia" btnText="Current trivia" />
        <Button props="OldTrivia" btnText="Old Trivia" />
        <Button props="AllPlayers" btnText="All Players" />
        <Button props="Invite" btnText="Invite Player" />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
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