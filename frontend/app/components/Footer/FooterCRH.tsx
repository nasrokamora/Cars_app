import Link from "next/link";
import React from "react";
// استخدم مكونات shadcn/ui المتاحة في مشروعك
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { CiLinkedin } from "react-icons/ci";
export default function FooterCRH() {
    const linkColumns = [
        {
            title: "Explore",
            links: [
                { title: "New Cars", href: "/new-cars" },
                { title: "Used Cars", href: "/used-cars" },
                { title: "Trucks", href: "/trucks" },
                { title: "Motorcycles", href: "/motorcycles" },
            ],
        },
        {
            title: "Company",
            links: [
                { title: "About", href: "/about" },
                { title: "Contact", href: "/contact" },
                { title: "Research", href: "/research" },
            ],
        },
        {
            title: "Legal",
            links: [
                { title: "Privacy Policy", href: "/privacy-policy" },
                { title: "Terms & Conditions", href: "/terms-conditions" },
            ],
        },
    ];

    return (
        <footer className="bg-slate-900 text-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Brand + CTA */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white font-bold">
                                CRH
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Cars Hub</h3>
                                <p className="text-sm text-slate-300">Buy, sell & research vehicles</p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-300">
                            A platform for buying and selling cars and vehicles — a fast and secure experience for both buyer and seller.
                        </p>

                        <div className="flex gap-3">
                            <Button className="bg-blue-500 hover:bg-blue-600">Sell Your Car</Button>
                            <Button variant="ghost" className="border border-slate-700">Get Started</Button>
                        </div>

                        <div className="flex items-center gap-3 pt-4">

                            <Link  className="p-2 rounded-md hover:bg-slate-800" href={''}>
                                <CiLinkedin className="w-5 h-5" />
                            </Link>
                            <Link  className="p-2 rounded-md hover:bg-slate-800" href={''}>
                                <FaFacebook className="w-5 h-5" />
                            </Link>
                            <Link  className="p-2 rounded-md hover:bg-slate-800" href={''}>
                                <BsInstagram className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links columns */}
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {linkColumns.map((col) => (
                            <div key={col.title}>
                                <h4 className="text-sm font-semibold text-slate-200 mb-3">{col.title}</h4>
                                <ul className="space-y-2">
                                    {col.links.map((l) => (
                                        <li key={l.href}>
                                            <Link href={l.href} className="text-sm text-slate-300 hover:text-white transition">
                                                {l.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Newsletter */}
                        {/* <div>
              <h4 className="text-sm font-semibold text-slate-200 mb-3">Stay up to date</h4>
              <Card className="bg-slate-800 border-none">
                <CardContent className="p-3">
                  <p className="text-sm text-slate-300 mb-2">اشترك لتصلك أحدث السيارات والعروض</p>
                  <form className="flex gap-2">
                    <Input placeholder="بريدك الإلكتروني" aria-label="email" className="bg-slate-700 text-white" />
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Subscribe</Button>
                  </form>
                </CardContent>
              </Card>
            </div> */}
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-400">© {new Date().getFullYear()} Cars Hub. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white">Privacy</Link>
                        <Link href="/terms-conditions" className="text-sm text-slate-400 hover:text-white">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
