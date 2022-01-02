import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

function Loading({ isLoading }) {
  if (isLoading)
    return (
      <tr className='loading'>
        <td colSpan='2'>
          <ScaleLoader color='white' loading={isLoading} size={50} />
        </td>
      </tr>
    )
  return <></>
}

export default Loading
