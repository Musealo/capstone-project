import Back from '../../Components/Back/Back';
import { getSession } from 'next-auth/react';
import Button from '../../Components/Button/Button';

import { useRouter } from 'next/router'


export default function Room({roomid}) {
  const router = useRouter()
  const { room_id } = router.query
  
  console.log(roomid)
  return (
    <>
     <Back pfad="/"/>
      <div className="flex gap-12 flex-col space-y-1.5 h-screen place-content-center w-auto shadow-xl bg-background text-center">
        <h1 className="text-text text-5xl">Room Menu</h1>
        <Button props={`${room_id}/AddTrivia`} btnText="Add Trivia" />
        <Button props={`${room_id}/currentfrivia`} btnText="Current trivia" />
        <Button props={`${room_id}/OldTrivia`} btnText="Old Trivia" />
        <Button props={`${room_id}/AllPlayers`} btnText="All Players" />
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