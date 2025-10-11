
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CarProfile from '@/public/all_image_cars/avatar_Profile.webp'



interface User {
    username: string,
    email: string,
}

export default function UserProfile({ user }: { user: User }) {
    return (
        <div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1">
                    <Avatar>
                        <AvatarImage src={CarProfile.src} alt="User" />
                        <AvatarFallback> {user?.username.slice(0, 3)} </AvatarFallback>
                    </Avatar>
                </div>
                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>Profile</a></li>
                    <li><a>Settings</a></li>
                </ul>
            </div>
        </div>
    )
}