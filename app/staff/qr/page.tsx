'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function GenerateQRPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [code, setCode] = useState('')
  const [paymentUrl, setPaymentUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setPaymentUrl('')

    try {
      const response = await fetch('/api/generate-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          code: code || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate payment link')
      }

      setPaymentUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setName('')
    setPrice('')
    setCode('')
    setPaymentUrl('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-[#FF4912] to-orange-400 bg-clip-text text-transparent">
          QR Generator
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Show payment links the fly
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Product Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                  Product Name <span className="text-[#FF4912]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4912] focus:border-transparent text-white placeholder-gray-500"
                  placeholder="e.g. LTD EC-1000 AMBER SUNBURST"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2 text-gray-300">
                  Price (£) <span className="text-[#FF4912]">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  step="0.01"
                  min="0.01"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4912] focus:border-transparent text-white placeholder-gray-500"
                  placeholder="e.g. 599.99"
                />
              </div>

              {/* Product Code */}
              <div>
                <label htmlFor="code" className="block text-sm font-medium mb-2 text-gray-300">
                  Product Code <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4912] focus:border-transparent text-white placeholder-gray-500"
                  placeholder="e.g. 10023158"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !name || !price}
                  className="flex-1 bg-gradient-to-r from-[#FF4912] to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    'Generate'
                  )}
                </button>

                {paymentUrl && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* QR Code Display Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">QR Code</h2>

            {!paymentUrl ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <p className="text-center">Fill out the form to generate a QR code</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* QR Code */}
                <div className="flex justify-center bg-white p-8 rounded-lg">
                  <QRCodeSVG
                    value={paymentUrl}
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Product:</span>
                    <span className="font-semibold">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="font-semibold">£{parseFloat(price).toFixed(2)}</span>
                  </div>
                  {code && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Code:</span>
                      <span className="font-semibold">{code}</span>
                    </div>
                  )}
                </div>

                {/* Payment Link */}
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Payment Link:</p>
                  <div className="bg-gray-900 p-3 rounded-lg break-all text-xs text-gray-300">
                    {paymentUrl}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paymentUrl)
                      alert('Payment link copied to clipboard!')
                    }}
                    className="w-full mt-3 px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-all duration-200"
                  >
                    Copy Link
                  </button>
                </div>

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
                >
                  Print QR Code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          .no-print {
            display: none !important;
          }
          @page {
            margin: 2cm;
          }
        }
      `}</style>
    </div>
  )
}
