import { SignUpAction } from "@/app/action/actions";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
                {/* 🔑 هنا تضيف الفورم */}
                <form className="space-y-4" action={SignUpAction}>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="username"
                        placeholder="Username"
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
