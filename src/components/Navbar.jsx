import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="flex justify-center  md:max-w-[274px] md:w-[254px] lg:w-[274px] md:bg-header-image-lg  bg-no-repeat bg-cover h-full md:justify-start md:pl-8 md:pt-10">
      <div className="fixed top-0 -z-10 h-[172px] bg-no-repeat bg-cover w-full bg-header-image md:hidden"></div>
      <nav aria-label="primary-navigation">
        <ul
          role="list"
          className="text-black flex items-center gap-4 md:flex-col md:items-start md:gap-8"
        >
          <li className="md:flex  md:justify-start md:gap-4">
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? 'bg-light-blue rounded-full border border-light-blue w-[2.0625rem] h-[2.0625rem] grid place-items-center'
                  : 'bg-transparent border border-white text-white rounded-full w-[2.0625rem] h-[2.0625rem] grid place-items-center ';
              }}
              to="/"
            >
              1
            </NavLink>
            <div className="hidden md:block">
              <p className="text-xs text-pastel-blue uppercase">step 1</p>
              <p className="text-sm text-white uppercase font-bold tracking-[1px]">
                Your info
              </p>
            </div>
          </li>
          <li className="md:flex items-center gap-4">
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? 'bg-light-blue rounded-full border border-light-blue w-[2.0625rem] h-[2.0625rem] grid place-items-center'
                  : 'bg-transparent border border-white text-white rounded-full w-[2.0625rem] h-[2.0625rem] grid place-items-center ';
              }}
              to="/step2"
            >
              2
            </NavLink>
            <div className="hidden md:block">
              <p className="text-xs text-pastel-blue uppercase">step 2</p>
              <p className="text-sm text-white uppercase font-bold tracking-[1px]">
                select plan
              </p>
            </div>
          </li>
          <li className="md:flex items-center gap-4">
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? 'bg-light-blue rounded-full border border-light-blue w-[2.0625rem] h-[2.0625rem] grid place-items-center'
                  : 'bg-transparent border border-white text-white rounded-full w-[2.0625rem] h-[2.0625rem] grid place-items-center ';
              }}
              to="/step3"
            >
              3
            </NavLink>
            <div className="hidden md:block">
              <p className="text-xs text-pastel-blue uppercase">step 3</p>
              <p className="text-sm text-white uppercase font-bold tracking-[1px]">
                add-ons
              </p>
            </div>
          </li>
          <li className="md:flex items-center gap-4">
            <NavLink
              className={() => {
                const isActive =
                  location.pathname === '/step4' ||
                  location.pathname === '/step5';
                return isActive
                  ? 'bg-light-blue rounded-full border border-light-blue w-[2.0625rem] h-[2.0625rem] grid place-items-center'
                  : 'bg-transparent border border-white text-white rounded-full w-[2.0625rem] h-[2.0625rem] grid place-items-center ';
              }}
              to="/step4"
            >
              4
            </NavLink>
            <div className="hidden md:block">
              <p className="text-xs text-pastel-blue uppercase">step 4</p>
              <p className="text-sm text-white uppercase font-bold tracking-[1px]">
                Summary
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
