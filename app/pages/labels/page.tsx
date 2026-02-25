"use client"

import guitars from "../../assets/guitars.json"
import { QRCodeSVG } from 'qrcode.react'

const Labels = () => {
    // L7160 Avery Labels: 21 labels per A4 (7 columns × 3 rows)
    // Label size: 63.5mm × 38.1mm

    const getProductUrl = (productCode: number) => {
        return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/product/${productCode}`
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
                    }
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Print button */}
            <div className="no-print fixed top-4 right-4 z-50">
                <button
                    onClick={() => window.print()}
                    className="py-3 px-6 bg-[#FF4912] text-white rounded drop-shadow-lg hover:bg-[#E63F0A] transition-colors uppercase font-bold"
                >
                    Print Labels
                </button>
            </div>

            {/* L7160 Grid Container */}
            <div className="w-[210mm] h-[297mm] mx-auto bg-white p-[15.5mm_7mm_15.5mm_4.7mm]">
                <div className="grid grid-cols-7 gap-x-[2.5mm] gap-y-0 w-full h-full">
                    {guitars.map((guitar, index) => (
                        <div
                            key={guitar.code}
                            className="w-[25.4mm] h-[38.1mm] flex flex-col justify-between p-[1.5mm] text-black border border-gray-300 overflow-hidden"
                            style={{
                                pageBreakInside: 'avoid',
                                breakInside: 'avoid'
                            }}
                        >
                            {/* Brand */}
                            <div className="text-[6pt] font-bold uppercase truncate text-center">
                                {guitar.brand}
                            </div>

                            {/* Product Name */}
                            <div className="text-[5pt] font-semibold leading-tight text-center flex-grow flex items-start justify-center overflow-hidden">
                                <span className="line-clamp-2">
                                    {guitar.name}
                                </span>
                            </div>

                            {/* QR Code */}
                            <div className="flex justify-center my-[1mm]">
                                <QRCodeSVG
                                    value={getProductUrl(guitar.code)}
                                    size={50}
                                    level="M"
                                    includeMargin={false}
                                />
                            </div>

                            {/* Prices */}
                            <div className="flex flex-col items-center gap-[0.5mm]">
                                <div className="text-[5pt] line-through text-gray-600">
                                    £{guitar.ssp}
                                </div>
                                <div className="text-[8pt] font-bold text-[#FF4912]">
                                    £{guitar.show}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Labels
