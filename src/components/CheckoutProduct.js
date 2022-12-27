import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({
    id,
    title,
    rating,
    price,
    description,
    category,
    image,
    hasPrime,
}) {
    const dispatch = useDispatch();


    const addItemToBasket = () => {
        const product = {
            id,
            title,
            rating,
            price,
            description,
            category,
            image,
            hasPrime,        
        }
        // 商品情報をreduxStoreに送りカートに追加
        dispatch(addToBasket(product))
    };

    const removeItemFromBasket = () => {
        // 商品情報をカートから削除
        dispatch(removeFromBasket({ id }))
    };


    return (
        <div className='grid grid-cols-5'>
            <Image
                src={image}
                alt=""
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
            />
            {/* middle */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className='h-5 text-yellow-500' />
                        ))}
                </div>

                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <p>¥{price}</p>

                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}

            </div>
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                    <button className='button' onClick={addItemToBasket}>カートに追加</button>
                    <button className='button' onClick={removeItemFromBasket}>カートから削除</button>
                </div>
        </div>
    )
}

export default CheckoutProduct