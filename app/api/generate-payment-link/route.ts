import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

export async function POST(req: NextRequest) {
  try {
    const { name, price, code } = await req.json()

    // Validate required fields
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    // Validate price is a positive number
    const priceNumber = parseFloat(price)
    if (isNaN(priceNumber) || priceNumber <= 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      )
    }

    // Create a Stripe product
    const product = await stripe.products.create({
      name: name,
      metadata: {
        ...(code && { code: code.toString() }),
      },
    })

    // Create a price for the product (convert to pence/cents)
    const stripePrice = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(priceNumber * 100), // Convert to pence
      currency: 'gbp',
    })

    // Create a payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: stripePrice.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        },
      },
    })

    return NextResponse.json({
      url: paymentLink.url,
      productId: product.id,
      priceId: stripePrice.id,
    })
  } catch (error: unknown) {
    console.error('Error creating payment link:', error)
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    )
  }
}
