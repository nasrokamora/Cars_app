"use client"

import { usePathname } from "next/navigation";



export default function BreadCrumb(){
    
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    
    
    return (
        <div>
            <h2>
                Home / {parts.join(' / ')}
            </h2>
        </div>
    )
}