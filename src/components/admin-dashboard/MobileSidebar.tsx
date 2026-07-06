"use client";
import { useState } from "react";
import { AdminSidebar } from "@/components";
import { Menu } from "lucide-react";

const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="lg:hidden p-3 m-4 rounded-md border shadow-md" onClick={() => setOpen(true)}>
                <Menu className="w-6 h-6" />
            </button>

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform 
        lg:hidden p-6 transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-end mb-4">
                    <button onClick={() => setOpen(false)} className="p-2 text-gray-600 hover:text-primary">
                        ✕
                    </button>
                </div>
                <AdminSidebar />
            </aside>

            {open && <div className="fixed inset-0 bg-black/10 bg-opacity-40 z-40 lg:hidden" onClick={() => setOpen(false)} />}
        </>
    );
};

export default MobileSidebar;
