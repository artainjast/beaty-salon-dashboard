import Image from 'next/image';
import React from 'react';
import instagramLogo from '../../../assets/images/instagram2.svg'
import whatsAppLogo from '../../../assets/images/whatsapp.svg'
import telegramLogo from '../../../assets/images/telegram.svg'
const Fotter = () => {
    return (
      <div className='flex bottom-0 left-0 h-fit justify-around w-screen bg-zinc-800 z-0 p-1'>
        <a className='w-8 h-8' target='blank' href='https://instagram.com/nail_maryi?igshid=YmMyMTA2M2Y='>
          <Image src={instagramLogo} priority={true} alt='' />
        </a>
        <a className='w-8 h-8' href='https://wa.me/989191402617' target='blank'>
          <Image src={whatsAppLogo} priority={false} alt='' />
        </a>
        <a className='w-8 h-8' href='tel://+989191402617'>
          <Image src={telegramLogo} priority={false} alt='' />
        </a>
      </div>
    );
};

export default Fotter;