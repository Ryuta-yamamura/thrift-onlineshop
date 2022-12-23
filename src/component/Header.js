import React from 'react'
import Image from 'next/image'

function Header() {
    return (
        <header>
            {/* 上位のナビゲーション */}
            <div>
                <div>
                    <Image
                    src='https://links.papareact.com/f90'
                    width={150}
                    height={40}
                    />
                </div>
            </div>

            {/* 下位のナビゲーション */}
            <div>

            </div>
        </header>
    )
}

export default Header