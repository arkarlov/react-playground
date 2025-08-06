import type { ReactNode } from 'react'

type Column<T> = {
  key: keyof T | (string & {})
  header: string
  render?: (row: T) => ReactNode
}

type Props<T> = {
  data: T[]
  columns: Column<T>[]
}

export const Table = <T,>({ data, columns }: Props<T>) => {
  // TODO:

  return (
    <table className="min-w-full border border-gray-300 text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className="border-b border-gray-300 px-4 py-2 font-medium"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            {columns.map((col) => (
              <td
                key={String(col.key)}
                className="border-b border-gray-200 px-4 py-2"
              >
                {col.render
                  ? col.render(row)
                  : (row[col.key as keyof T] as ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
