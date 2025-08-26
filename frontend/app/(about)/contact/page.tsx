export default function AboutPage() {
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Contact</h1>
            <p className="mb-4">
                If you have any questions or comments, please don&#39;t hesitate to reach out.
            </p>
            <address className="not-italic">
                <p>John Doe</p>
                <p>123 Main St</p>
                <p>Anytown, USA 12345</p>
                <p>
                    <a href="mailto:john.doe@example.com">john.doe@example.com</a>
                </p>
                <p>
                    <a href="tel:+1234567890">+1 234 567 890</a>
                </p>
            </address>
        </div>
    );
}
