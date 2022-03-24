import Link from 'next/link';
import React from 'react';

function CreateRoomButton() {
  return (
    <>
    <Link href="/room">
      <button className="gap-3 bg-btn font-medium  uppercase">
        Create a room
      </button>
    </Link>
    </>
  );
}

export default CreateRoomButton;
