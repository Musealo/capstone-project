import Button from '../Components/Button/Button';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function Room() {
  return (
    <>
    <Link href="/">
      <a>
      <div>
        <FaArrowCircleLeft size={50} color="white" />
      </div>
      </a>
      </Link>
      <div className="flex gap-12 flex-col space-y-1.5 h-screen place-content-center w-auto shadow-xl bg-background text-center">
        <h1 className="text-text text-5xl">Room Menu</h1>
        <Button props="AddTrivia" btnText="Add Trivia" />
        <Button props="CurrentTrivia" btnText="Current trivia" />
        <Button props="OldTrivia" btnText="Old Trivia" />
        <Button props="AllPlayers" btnText="All Players" />
        <Button props="Invite" btnText="Invite Player" />
      </div>
    </>
  );
}
