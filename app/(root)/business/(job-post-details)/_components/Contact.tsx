import Image from 'next/image'
import fallback from '../../../../../public/fallback-img.png'

export default function Contact({user}: {user: User}) {
  return (
    <div className='text-center'>
        <Image src={user.imgUrl ?? fallback} alt={user.username} width={100} height={100} className='rounded-full mx-auto' />
        <h1>{user.username}</h1>
        <p>📧 <span>{user.email}</span> <span>{user.phoneNumber}</span></p>        
    </div>
  )
}
