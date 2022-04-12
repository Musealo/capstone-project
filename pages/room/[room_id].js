import { getSession } from 'next-auth/react';
import LinkButton from '../../Components/LinkButton/LinkButton';
import RoomMenu from '../../public/images/RoomMenu.png';
import { useRouter } from 'next/router';
import BackButton from '../../Components/BackButton/BackButton';
import InviteButton from '../../Components/InviteButton/InviteButton';
import Image from 'next/image';

export default function Room() {
  const router = useRouter();
  const { room_id } = router.query;

  return (
    <>
      <BackButton />
      <Image src={RoomMenu} alt="Logo with Room Menu as text" />
      <div className="flex gap-6 flex-wrap flex-col text-center">
        <LinkButton href={`${room_id}/addfrivia`}>Add Frivia</LinkButton>
        <LinkButton href={`${room_id}/currentfrivia`}>
          Current Frivia
        </LinkButton>
        <LinkButton href={`${room_id}/oldfrivia`}>Old Frivia</LinkButton>
        <LinkButton href={`${room_id}/allplayers`}>All Players</LinkButton>
        <InviteButton />
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
