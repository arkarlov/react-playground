import { useQuery } from '@tanstack/react-query'
import { getPersonList } from './api'

export const UserList = () => {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isPending,
    isError,
    isStale,
  } = useQuery({
    queryKey: ['users', 'useList'],
    queryFn: getPersonList,
    select(data) {
      return data.data
    },
    // staleTime: Number.POSITIVE_INFINITY,
    // refetchInterval: 10000,
  })

  return (
    <>
      <div>
        <h2>Status</h2>
        <Status name="isLoading" isActive={isLoading} />
        <Status name="isPending" isActive={isPending} />
        <Status name="isFetching" isActive={isFetching} />
        <Status name="isSuccess" isActive={isSuccess} />
        <Status name="isError" isActive={isError} />
        <Status name="isStale" isActive={isStale} />
        <Status name="isData" isActive={!!data} />
      </div>

      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.firstname}</li>
          ))}
        </ul>
      )}
    </>
  )
}

const Status = (props: { name: string; isActive: boolean }) => (
  <p style={{ height: '1.2em', display: 'flex', alignItems: 'center' }}>
    {props.name}:
    <span
      style={{
        display: 'inline-block',
        marginLeft: '5px',
        width: '.7em',
        height: '.7em',
        borderRadius: '50%',
        backgroundColor: props.isActive ? 'green' : 'lightgray',
        outline: `1px solid ${props.isActive ? 'green' : 'lightgray'}`,
        outlineOffset: '0.1em',
      }}
    />
  </p>
)
