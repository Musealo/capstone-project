import { Router, useRouter } from 'next/router';
import React from 'react';
import { useSession, getSession } from 'next-auth/react';

function JoinRoomButton() {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleJoinRoom(e) {
    e.preventDefault();
    const inputValue = document.querySelector('input').value;
    const response = await fetch(`/api/rooms/${inputValue}/players`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
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
            className="bg-titelAndQuestion text-text rounded font-medium p-1 w-60"
          ></input>
          <button
            className="bg-btn font-medium  uppercase p-1 "
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
