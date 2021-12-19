import React from 'react'

function Loading({ isLoading }) {
  if (isLoading)
    return (
      <tr className='loading'>
        <td colSpan='2'>Loading...</td>
      </tr>
    )
  return <></>
}

export default Loading
