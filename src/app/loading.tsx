import React from "react"
import loader from "../app/components/assets/loader.svg"
import Image from "next/image"

export default function Loading() {
  return (
    <div className='flex items-center justify-center'>
      <Image src={loader} alt='loader' width={50} height={50} />
    </div>
  )
}

