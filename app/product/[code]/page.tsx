"use client"

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import guitars from '@/app/assets/guitars.json'
import Image from 'next/image'

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)

    const productCode = params.code as string
    const product = guitars.find(g => g.code.toString() === productCode)

    useEffect(() => {
        if (product) {
            handleCheckout()
        }
    }, [product])

    const handleCheckout = async () => {
        if (!product || isProcessing) return

        try {
            setIsProcessing(true)

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product }),
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Error during checkout:', error)
            setIsProcessing(false)
        }
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="py-3 px-6 bg-[#FF4912] text-white rounded"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-8">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
                <Image
                    src={`https://soundservicelabs.com/api/img/${product.brand}.jpg`}
                    className="mx-auto mb-4 dark:invert"
                    alt={product.brand}
                    width={120}
                    height={60}
                />
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.brand}</p>

                <div className="mb-6">
                    <Image
                        src={`https://media.sound-service.eu/Artikelbilder/Shopsystem/278x148/${product.image}`}
                        className="mx-auto dark:rounded-xl"
                        alt={product.name}
                        width={200}
                        height={106}
                    />
                </div>

                <div className="flex gap-4 items-center justify-center mb-6">
                    <span className="line-through text-gray-500">£{product.ssp}</span>
                    <span className="text-3xl font-bold text-[#FF4912]">£{product.show}</span>
                </div>

                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4912]"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-300">
                        Redirecting to checkout...
                    </span>
                </div>
            </div>
        </div>
    )
}
