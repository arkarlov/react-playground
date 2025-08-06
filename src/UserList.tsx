import { useQuery } from "@tanstack/react-query";
import { fetchUserList } from "./api";

export const UserList = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", "useList"],
    queryFn: fetchUserList,
    select(data) {
      return data.data;
    },
    // staleTime: Number.POSITIVE_INFINITY,
    // refetchInterval: 10000,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <ul
        style={{
          transition: "background-color 0.3s ease",
          backgroundColor: isFetching
            ? "rgba(129, 127, 127, 0.5)"
            : undefined,
        }}
      >
        {data.map((user) => (
          <li key={user.id}>{user.firstname}</li>
        ))}
      </ul>
    </>
  );
};
