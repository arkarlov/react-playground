import { useCallback } from 'react'
import { useBlocker, type BlockerFunction } from 'react-router'

export default function About() {
  const shouldBlock = useCallback<BlockerFunction>(
    ({ historyAction }) => historyAction === 'POP',
    []
  ) // true
  const blocker = useBlocker(shouldBlock)

  console.log('history.state', history.state)

  return (
    <>
      <h1>About Page</h1>
      {blocker.state === 'blocked' && (
        <div className="m-4 p-4 bg-purple-200 rounded-2xl">
          <p className="p-2">Do u want to leave this page?</p>
          <button
            className="m-2 bg-gray-200"
            type="button"
            onClick={() => blocker.reset()}
          >
            Cancel
          </button>
          <button
            className="m-2 bg-red-300"
            type="button"
            onClick={() => blocker.proceed()}
          >
            OK
          </button>
        </div>
      )}
    </>
  )
}
