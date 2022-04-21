import React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import { FaSyncAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AllPlayerPage from '../../../public/images/AllPlayer.png';

function AllPlayer() {
  const router = useRouter();
  const { room_id } = router.query;
  const [users, setUsers] = useState([]);

  async function fetchRooms() {
    try {
      const responseRoomUser = await fetch(`/api/rooms/${room_id}/players`);
      let userData = await responseRoomUser.json();
      setUsers(userData);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (room_id) {
      fetchRooms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room_id]);

  return (
    <>
      <BackButton />
      {users.length > 0 ? (
        <div className="text-text text-center">
          <Image
            src={AllPlayerPage}
            alt="All player cat logo"
            width="180"
            height="180"
          />
          {users.map(user => {
            return (
              <div
                key={user.name}
                className="flex gap-2 border bg-cardBackground mb-3"
              >
                <Image
                  alt="profilepic"
                  src={user.image}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <p className="justify-center justify-items-center self-center text-text">
                  {user.name} |
                </p>
                <p className="self-center text-text">
                  correct answers: {user.rightAnswers}/{user.totalAnswers}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex text-text flex-row justify-center">
          <FaSyncAlt color="white" className="animate-spin " />
          Loading…
        </div>
      )}
    </>
  );
}

export default AllPlayer;
