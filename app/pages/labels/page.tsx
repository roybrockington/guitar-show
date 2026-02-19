"use client"

import Image, { StaticImageData } from "next/image"
import guitars from "../../assets/guitars.json"
import ltd from "@/public/images/ltd.jpg";
import esp from "@/public/images/esp.jpg";
import eii from "@/public/images/eii.jpg";


const Labels = () => {

    const brandMap: Record<string, StaticImageData> = {
        "https://soundservicelabs.com/api/img/LTD.jpg": ltd,
        "https://soundservicelabs.com/api/img/ESP.jpg": esp,
        "https://soundservicelabs.com/api/img/E-II.jpg": eii
    }


    return (
        <div className="bg-white flex flex-wrap">
            {guitars.map(guitar =>
                <div className="w-1/3 flex justify-between p-2 items-center border rounded h-[144px]" key={guitar.sku}>
                    <div className="mr-4 flex flex-col justify-end gap-2">
                        <Image
                            src={brandMap[guitar.brand]}
                            alt=""
                            width={0}
                            height={20}
                            priority
                        />
                        <h4 className="text-xs font-bold">{guitar.description}</h4>
                        <div className="w-full flex gap-3 mt-auto">
                            <span className="font-bold line-through">£{guitar.ssp}</span>
                            <span className="font-bold">£{guitar.bloodstock}</span>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <Image 
                            src={`https://quickchart.io/qr?size=180&text=${guitar.link}`} 
                            width={70} 
                            height={70}
                            alt={guitar.description}
                        />
                    </div>
                </div>
            )}

        </div>
    )
}

export default Labels
