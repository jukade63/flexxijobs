import React from 'react'
import StarRating from '../../(main)/history/_components/StarRating'

export default function Rating({ratings}: {ratings: Rating[]}) {
    const avg = ratings?.reduce((acc, cur) => acc + cur.value, 0)/ratings?.length    
    const total = ratings?.length
  return (
    <div className='flex gap-2 justify-center items-center'>
        <StarRating initialValue={avg} size={4}/>
        <p className='text-sm'>({total})</p>
    </div>
  )
}
