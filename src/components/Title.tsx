import { ReactNode } from 'react';

const Title = ({ title, desc }: { title: string; desc?: ReactNode }) => {
  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex flex-row items-center '>
        <div className='rounded-btn my-4 mr-2 h-8 w-2 bg-primary'></div>
        <div className=' font-bold'>{title}</div>
      </div>
      {desc && <div className=''>{desc}</div>}
    </div>
  );
};

export default Title;
