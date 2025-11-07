import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import LogoutButton from "../(auth)/auth/logout/Logout"
import { LogoutAction } from "../api/auth/logout/action"
// import AddCars from "../components/AddCars/AddCars"
import { cookies } from "next/headers"
import { getBrands, getCategories } from "../libs/api"
import CreateCarForm from "../components/CreateCarForm/CreateCarForm"
import CarsList from "../components/UserProfile/CarList"

async function getUserCars(accessToken: string) {
  const res = await fetch(`${process.env.NEXT_NEST_API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const user = await res.json();
  return user.cars ?? [];
}

export default async function DashboardHeader() {
  // const data = await getProfile();
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) throw new Error(`Unauthorized`);

const [brands, categories, cars] = await Promise.all([getBrands(), getCategories(), getUserCars(accessToken)]);

  return (
    <header className="sticky h-auto  w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  container">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <form action={LogoutAction}>
                <button type="submit" className="text-red-600">Logout</button>
              </form>

            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


        <div>
          <CreateCarForm brand={brands} category={categories} initialCars={cars} />
        </div>
        <div className='mt-10'>

        <CarsList cars={cars} />
        </div>
      {/* <div className=" flex flex-col mt-10 container ml-5 border rounded-md border-black w-fit p-3 cursor-pointer hover:bg-black hover:text-white">
        <AddCars />
        <div>
        {data.cars?.map((car) => (
          <div
            key={car.id}
            className="p-4 bg-white rounded-xl shadow space-y-2"
          >
            <h3 className="text-lg font-semibold">{car.name}</h3>
            <p>السعر: {car.price} $</p>
          </div>
        ))}
        </div>
      </div> */}
    </header>
  )
}
