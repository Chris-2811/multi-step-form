import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Footer({ form, prevPath, type }) {
  const location = useLocation();

  const isHomePage =
    location.pathname === '/' ||
    location.pathname === '/home' ||
    location.pathname === '/step5';

  return (
    <footer className="fixed bottom-0 left-0 p-4 bg-white w-full md:relative md:p-0 ">
      <div
        className={`myContainer flex items-center ${
          isHomePage ? 'justify-end' : 'justify-between'
        } md:p-0`}
      >
        {!isHomePage && (
          <Link to={prevPath} className="text-sm lg:text-base text-cool-gray">
            Go back
          </Link>
        )}
        <button
          type="submit"
          form={form}
          className={`text-white ${
            type === confirm
              ? 'bg-purplish-blue hover:bg-purplish-blue/75'
              : 'bg-marine-blue'
          } px-4 py-3 rounded align-end w-[123px]`}
        >
          {type === confirm ? 'Confirm' : 'Next Step'}
        </button>
      </div>
    </footer>
  );
}

export default Footer;
