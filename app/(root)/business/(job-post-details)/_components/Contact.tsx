import Image from 'next/image'
import fallback from '../../../../../public/fallback-img.png'

export default function Contact({user}: {user: User}) {
  return (
    <div className='text-center'>
        <Image src={user.imgUrl ?? fallback} alt={user.username} width={100} height={100} className='rounded-full mx-auto' />
        <h1 className='mb-2 text-lg font-semibold'>{user.username}</h1>
        <p className='text-sm'>📧 <span>{user.email}</span> <span className='ml-4'>📱{user.phoneNumber}</span></p>        
    </div>
  )
}
