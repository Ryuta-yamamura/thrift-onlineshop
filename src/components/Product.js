import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    const [rating] = useState(
        // Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
        3)
    const [hasPrime] = useState(1);

    return (

        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
                <Image
                    src={image}
                    alt=""
                    width={200}
                    height={200}
                    style={{
                        objectFit: 'contain',
                        margin: 'auto',
                    }} />
            <h4 className='my-3'>{title}</h4>

            <div className='flex'>
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon className='h-5' />
                    ))}
            </div>

            <p className='text-xs my-2 line-clamp-2'>{description}</p>
            <div className='mb-5'>
                <p>¥{price}</p>
            </div>

            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}

            <button className='mt-auto button'>カートに追加</button>

        </div>
    )
}

export default Product