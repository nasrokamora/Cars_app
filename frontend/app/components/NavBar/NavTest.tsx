



export default function NavTest() {
    return (
        <nav className="navbar w-full border border-b-2 border-b-black ">
            <div className="navbar-start">
                <h1>
                    Cars Hub
                </h1>
            </div>
            <div className="navbar-center">
                <ul className="menu menu-horizontal p-0">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
                <li><a>Item 3</a></li>
            </ul>
        </div>
            <div className="navbar-end mr-4">
                <button className="btn btn-primary">Login</button>
                <button className="btn btn-primary">Sign Up</button>
            </div>

        </nav >
    )
}