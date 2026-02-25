"use client"

import guitars from "./assets/guitars.json"
import merch from "./assets/merch.json"
import { useState } from "react"
import Products from "./components/Products"
import Link from "next/link"


export default function Home() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

    const brands = ["Citadel", "ENGL", "ESP", "LTD", "Markbass", "Zoom"]

    const selectBrand = (brand: string) => {
        setSelectedBrand(selectedBrand === brand ? null : brand)
        setIsMenuOpen(false)
    }

    const filteredGuitars = selectedBrand
        ? guitars.filter(guitar => guitar.brand === selectedBrand)
        : guitars

    return (
        <div className="font-sans min-h-screen px-8">
            <aside className="w-full flex list-none gap-4 justify-center text-xl my-4 relative">
                {/* Hamburger Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="px-4 py-2 rounded-xl cursor-pointer bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 w-full justify-center"
                    aria-label="Toggle brand menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    <h3 className="text-white text-sm font-bold">Brands</h3>
                </button>

                {/* Collapsible Brand Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 z-50 min-w-100 border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col gap-2 items-center">
                            {brands.map(brand => (
                                <button
                                    key={brand}
                                    onClick={() => selectBrand(brand)}
                                    className={`flex justify-center w-full px-3 py-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                        selectedBrand === brand
                                            ? 'border border-gray-300 text-white'
                                            : 'text-gray-800 dark:text-gray-200'
                                    }`}
                                >
                                    <img src={`https://soundservicelabs.com/api/img/${brand}.jpg`} alt={brand} className="max-h-10" />
                                </button>
                            ))}
                        </div>
                        {selectedBrand && (
                            <button
                                onClick={() => {
                                    setSelectedBrand(null)
                                    setIsMenuOpen(false)
                                }}
                                className="mt-3 w-full text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                                Show All
                            </button>
                        )}
                    </div>
                )}
            </aside>
            <main className="flex flex-col row-start-2 items-center sm:items-start">
                <div className="w-full flex justify-between items-center mb-4 pb-2 border-b-1 border-b-zinc-300">
                    <span className="flex-grow"></span>
                </div>
                <Products products={filteredGuitars} />
            </main>
        </div>
    )
}
