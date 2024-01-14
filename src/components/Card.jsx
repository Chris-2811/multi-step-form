import React from 'react';

function Card({ children }) {
  return (
    <div className="bg-white py-8 px-6 rounded-[10px] max-w-[540px]  mx-auto shadow-card-shadow md:flex md:justify-end  md:flex-row-reverse md:p-4 md:max-w-[840px] lg:max-w-[940px] lg:w-[940px] md:h-[600px] lg:max-h-[600px] ">
      {children}
    </div>
  );
}

export default Card;
