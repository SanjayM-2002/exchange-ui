'use client';

import { Depth } from '@/app/components/depth/Depth';
import { useParams } from 'next/navigation';

export default function Page() {
  const { market } = useParams();

  return (
    <div className='flex flex-col flex-1'>
      {/* <div className='flex flex-col flex-1 bg-yellow-200'>
        Marketbar section
        <div className='flex flex-row h-[620px] border-y border-slate-800 bg-green-400'>
          <div className='flex flex-col flex-1'>Tradeview section</div>
          <div className='w-[1px] flex-col border-slate-800 border-l'></div>
          <div className='flex flex-col w-[250px] overflow-hidden bg-red-400'>
            Depth section
          </div>
        </div>
      </div>
      <div className='w-[1px] flex-col border-slate-800 border-l'></div>
      <div>
        <div className='flex flex-col w-[250px] bg-blue-200'>Swap section</div>
      </div> */}
      <div className='flex flex-col flex-1 bg-yellow-200'>
        Marketbar section
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 border-y border-slate-800  h-auto'>
        <div className='flex flex-col flex-1'>Tradeview section</div>
        <div className='flex flex-col w-auto overflow-hidden '>
          Depth section
          <Depth market={market as string} />
        </div>
        <div>
          <div className='flex flex-col w-auto bg-blue-200'>Swap section</div>
        </div>
      </div>
    </div>
  );
}
