"use client"

import guitars from "../assets/guitars.json"
import { QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'

const Labels = () => {
    // L7160 Avery Labels: 21 labels per A4 (3 columns × 7 rows) - Portrait
    // Label size: 63.5mm × 38.1mm

    const getProductUrl = (productCode: number) => {
        return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/product/${productCode}`
    }

    // Split products into pages of 21 labels each
    const labelsPerPage = 21
    const pages = []
    for (let i = 0; i < guitars.length; i += labelsPerPage) {
        pages.push(guitars.slice(i, i + labelsPerPage))
    }

    return (
        <div className="bg-white w-full min-h-screen p-0 m-0">
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .page-break {
                        page-break-after: always;
                        break-after: page;
                    }
                }
            `}</style>

            {/* Control buttons */}
            <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
                <Link
                    href="/"
                    className="py-3 px-6 bg-gray-800 text-white rounded drop-shadow-lg hover:bg-gray-700 transition-colors uppercase font-bold"
                >
                    ← Back
                </Link>
                <button
                    onClick={() => window.print()}
                    className="py-3 px-6 bg-[#FF4912] text-white rounded drop-shadow-lg hover:bg-[#E63F0A] transition-colors uppercase font-bold"
                >
                    Print Labels
                </button>
            </div>

            {/* L7160 Pages */}
            {pages.map((pageProducts, pageIndex) => (
                <div
                    key={pageIndex}
                    className={`w-[210mm] h-[297mm] mx-auto bg-white ${
                        pageIndex < pages.length - 1 ? 'page-break' : ''
                    }`}
                    style={{
                        paddingTop: '15.5mm',
                        paddingRight: '7mm',
                        paddingBottom: '13mm',
                        paddingLeft: '4.7mm',
                    }}
                >
                    <div
                        className="grid grid-cols-3 gap-x-[2.5mm] gap-y-0 w-full"
                        style={{
                            gridAutoRows: '38.1mm',
                        }}
                    >
                        {pageProducts.map((guitar) => (
                            <div
                                key={guitar.code}
                                className="w-[63.5mm] h-[38.1mm] flex flex-col justify-between p-[2mm] text-black border border-gray-300 overflow-hidden"
                                style={{
                                    pageBreakInside: 'avoid',
                                    breakInside: 'avoid'
                                }}
                            >
                                {/* Brand */}
                                <div className="text-[8pt] font-bold uppercase truncate text-center">
                                    {guitar.brand}
                                </div>

                                {/* Product Name */}
                                <div className="text-[7pt] font-semibold leading-tight text-center flex-grow flex items-start justify-center overflow-hidden">
                                    <span className="line-clamp-2">
                                        {guitar.name}
                                    </span>
                                </div>

                                {/* QR Code */}
                                <div className="flex justify-center my-[1mm]">
                                    <QRCodeSVG
                                        value={getProductUrl(guitar.code)}
                                        size={60}
                                        level="M"
                                        includeMargin={false}
                                    />
                                </div>

                                {/* Prices */}
                                <div className="flex flex-col items-center gap-[0.5mm]">
                                    <div className="text-[7pt] line-through text-gray-600">
                                        £{guitar.ssp}
                                    </div>
                                    <div className="text-[10pt] font-bold text-[#FF4912]">
                                        £{guitar.show}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Fill remaining cells with empty labels if needed */}
                        {Array.from({ length: labelsPerPage - pageProducts.length }).map((_, i) => (
                            <div
                                key={`empty-${i}`}
                                className="w-[63.5mm] h-[38.1mm] border border-gray-200"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Labels
