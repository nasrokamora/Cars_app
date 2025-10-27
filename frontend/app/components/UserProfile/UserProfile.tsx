
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CarProfile from '@/public/all_image_cars/avatar_Profile.webp'
import Link from "next/link"


interface User {
    username: string,
    email: string,
}

export default function UserProfile({ user }: { user: User }) {
    return (
        <div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1 cursor-pointer">
                    <Avatar>
                        <AvatarImage src={CarProfile.src} alt="User" />
                        {/* <AvatarFallback> {user.username.slice(0, 3)} </AvatarFallback> */}
                    </Avatar>
                    <h1>{user?.username}</h1>
                    <h1>{user?.email}</h1>
                </div>
                <ul tabIndex={-1} className="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm dark:bg-gray-800">
                    <li><Link href={'/dashboard'}>Profile</Link></li>
                    <li><a>Settings</a></li>
                </ul>
            </div>
        </div>
    )
}