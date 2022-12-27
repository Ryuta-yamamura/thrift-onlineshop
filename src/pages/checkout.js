import Image from 'next/image'
import React from 'react'
import Header from '../components/Header'
import CheckoutProduct from '../components/CheckoutProduct'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import { useSession } from 'next-auth/react'

function checkout() {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const { data: session, status } = useSession()
    const loading = status === "loading"
    return (
        <div className='bg-gray-100'>
            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* 左側 */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src="https://links.papareact.com/ikj"
                        alt=""
                        width={1020}
                        height={250}
                        style={{ objectFit: "contain" }}
                    />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0
                                ? "カート内に商品はありません"
                                : "カートの商品一覧"
                            }
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>
                {/* 右側 */}
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2>合計金額 ({items.length} 個)
                            <span className='font-bold'>
                                <p>¥{total}</p>
                            </span>
                            </h2>

                            <button 
                            disabled={!session}
                            className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 
                                  "購入手続きに進むためには、サインインしてください。"
                                : "購入手続きに進む"
                                }
                            </button>
                        </>
                    )}

                </div>

            </main>

        </div>
    )
}

export default checkout