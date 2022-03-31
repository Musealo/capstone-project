import useSWR from "swr";



export default function FriviaList({ type }) {
  const frivias = useSWR(type === "feed" ? "api/feed" : "/api/frivia");

  return (
    <>
      {frivias.data && Array.isArray(frivias.data) ? (
        frivias.data.length > 0 ? (
          <ul>
            {frivias.data.map((frivia) => (
              <li key={frivia._id}>
                
              </li>
            ))}
          </ul>
        ) : (
          <div>No current Frivias yet 🤷‍♂️</div>
        )
      ) : (
        <div>Loading…</div>
      )}
    </>
  );
}
