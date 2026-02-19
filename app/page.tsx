"use client"

import guitars from "./assets/guitars.json"
import merch from "./assets/merch.json"
import { useState } from "react"
import Products from "./components/Products"


export default function Home() {

    const [activeTab, setActiveTab] = useState<"guitars" | "merch">("guitars")

    return (
        <div className="font-sans min-h-screen px-8">
            <aside className="w-full flex list-none gap-4 justify-center text-xl my-4">
                <button onClick={() => setActiveTab("guitars")} className={`px-2 rounded-xl cursor-pointer ${activeTab == "guitars" ? 'text-white bg-black dark:bg-red-900' : ''}`}>Guitars</button>
                <span>|</span>
                <button onClick={() => setActiveTab("merch")} className={`px-2 rounded-xl cursor-pointer ${activeTab == "merch" ? 'text-white bg-black dark:bg-red-900' : ''}`}>Merch</button>
            </aside>
            <main className="flex flex-col row-start-2 items-center sm:items-start">
                <span className="mb-2 h-2 border-b-1 border-b-zinc-300 w-full"></span>
                <Products products={guitars} show={activeTab == "guitars"} />
                <Products products={merch} show={activeTab == "merch"} />
            </main>
        </div>
    )
}
