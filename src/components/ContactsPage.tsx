import { useQuery } from '@tanstack/react-query'
import { Header } from './Header'
import { Layout } from './Layout'
import { getPersonList } from '../api'
import { Table } from './Table'

export function ContactsPage() {
  const { data } = useQuery({
    queryKey: ['users', 'useList'],
    queryFn: getPersonList,
    select(data) {
      return data.data
    },
    // staleTime: Number.POSITIVE_INFINITY,
    // refetchInterval: 10000,
  })

  return (
    <Layout>
      <Header />

      {data && (
        <Table
          data={data}
          columns={[
            {
              key: 'firstname',
              header: 'First Name',
            },
            {
              key: 'lastname',
              header: 'Last Name',
            },
            { key: 'email', header: 'E-mail' },
            { key: 'phone', header: 'Tel.' },
            { key: 'action', header: '', render: () => 'X' },
          ]}
        />
      )}
    </Layout>
  )
}
