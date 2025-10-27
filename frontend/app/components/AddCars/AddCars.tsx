import { CreateCarAction } from "@/app/(cars)/action/cars";
import { getBrands, getCategories } from "@/app/libs/api";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Brand = { id: number | string; name: string };
type Category = { id: number | string; name: string };

export default async function AddCars() {
    const brand = getBrands();
    const category = getCategories();
    const [dataBrands, dataCategories] = await Promise.all([brand, category]);
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>Create Car</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create your Car</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to do this?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {/* card */}
                    <Card className=" bg-transparent border-none w-auto h-auto">
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                            <CardAction>Card Action</CardAction>
                        </CardHeader>
                        <CardContent>
                            <form action={CreateCarAction} className=" m-3 grid grid-cols-2 gap-5">
                                <select name="brand" id="brand">
                                    {dataBrands.map((brand: Brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                                <select name="category" id="category">
                                    {dataCategories.map((category: Category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                <input type="text" name="title" id="title" placeholder="Title" />
                                <input type="text" name="description" id="description" placeholder="Description" />
                                <input type="number" name="price" id="price" placeholder="Price" />
                                <AlertDialogAction role="submit">Create </AlertDialogAction>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                    <AlertDialogFooter>
                        <AlertDialogCancel >Cancel</AlertDialogCancel>
                        
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}