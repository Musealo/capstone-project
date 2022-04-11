import { Router, useRouter } from 'next/router';
import React from 'react';
import { useSession, getSession } from 'next-auth/react';

function JoinRoomButton() {
  const { data: session } = useSession();
  const router = useRouter();
  function handleJoinRoom(e) {
    const inputValue = document.querySelector('input').value;
    e.preventDefault();
    router.push(`/room/${inputValue}`);
  }
  if (session) {
    return (
      <>
        <form onSubmit={handleJoinRoom}>
          <p>Paste the roomID here</p>
          <label htmlFor="joinRoom" className="text-text "></label>
          <input
            type="text"
            id="joinRoom"
            name="joinRoom"
            className="bg-titelAndQuestion text-text rounded font-medium"
          ></input>
          <button
            className="bg-btn font-medium  uppercase"
            type="submit"
            value="Join Room!"
          >
            Join!
          </button>
        </form>
      </>
    );
  }
  return <p></p>;
}

export default JoinRoomButton;
