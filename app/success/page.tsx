"use client"

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 mx-auto text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for your purchase. Your order has been confirmed.
                </p>
                {sessionId && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                        <span className='font-bold'>Session ID:</span> <span className='break-all'>{sessionId}</span>
                    </p>
                )}
                <Link
                    href="/"
                    className="inline-block py-3 px-6 bg-[#FF4912] text-white rounded drop-shadow-lg hover:bg-[#E63F0A] transition-colors uppercase"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
