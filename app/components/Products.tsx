import Image from "next/image"
import Link from "next/link"

type Product = {
   sku: number
   description: string
   ssp: number
   image1: string
   brand: string
   street: number
   bloodstock: number
   link: string
}

const Products = ({products, show}: {products: Product[], show: boolean}) => {

    return (
        <ul className="w-full flex flex-col gap-4">
        {products.map(product =>
            <li 
                key={product.sku} 
                className={`mb-2 list-none ${show ? 'flex' : 'hidden'} flex-col items-center gap-4 pb-4 border-b-1 border-b-zinc-300 w-full`}
            >
                <Image
                    src={product.brand}
                        className="dark:invert"
                    alt=""
                    width={80}
                    height={40}
                    priority
                />
                <h3 className="text-xl font-bold text-center">{product.description}</h3>
                <div className="flex">
                    <Image
                        src={`/images/${product.sku}.jpg`}
                            className="dark:rounded-xl"
                        alt={product.description}
                        width={180}
                        height={38}
                        priority
                    />
                </div>
                <p className="flex gap-4 items-center">
                    <span className="line-through">£{product.ssp}</span>
                    <span className="text-xl font-bold">£{product.bloodstock}</span>
                </p>
                <Link className="py-4 px-8 uppercase bg-gradient-to-r bg-red-700 text-white rounded drop-shadow-lg" href={product.link}>Buy</Link>
            </li>
        )}
        </ul>

    )

}
export default Products
