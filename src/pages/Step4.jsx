import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import arcadeIcon from '../assets/icon-arcade.svg';
import advancedIcon from '../assets/icon-advanced.svg';
import proIcon from '../assets/icon-pro.svg';
import { Link } from 'react-router-dom';
import CompletionContext from './context/CompletionContext';

function Step4() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [total, setTotal] = useState(0);

  const { stepCompletion } = useContext(CompletionContext);

  const navigate = useNavigate();

  const plans = [
    {
      id: 'online-service',
      name: 'Online-service',
      price: '$1/mo',
      priceYear: '$10/yr',
      text: 'Access to multiplayer games',
    },
    {
      id: 'larger-storage',
      name: 'Larger storage',
      price: '$2/mo',
      priceYear: '$20/yr',
      text: 'Extra 1TB of cloud save',
    },
    {
      id: 'customizable-profile',
      name: 'Customizable profile',
      price: '$2/mo',
      priceYear: '$20/yr',
      text: 'Custom theme on your profile',
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();

    try {
      if (stepCompletion) {
        setSubmitted(true);

        navigate('/step5');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData'));
    setFormData(data);
    setTotal(calculateTotal(data));
  }, []);

  function calculateTotal(formData) {
    let total = 0;

    if (formData && formData.price) {
      const newString = Array.from(formData.price)
        .filter((char) => !isNaN(char))
        .join('');
      total += Number(newString);
    }

    if (formData && formData.addons) {
      const totalAddons = formData.addons.reduce((sum, item) => {
        const price = Number(item.price.replace(/[^0-9.-]+/g, ''));
        return sum + price;
      }, 0);
      total += totalAddons;
    }

    return total;
  }

  function capitalizeFirstWord(str) {
    const words = str.split(' ');
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ');
  }

  return (
    <div className="myContainer h-full">
      <Card>
        {/* Form */}
        <div className="lg:pl-[6.25rem] lg:pr-[5.25rem] w-full md:pl-10 md:pr-6 md:pt-10 md:pb-4 flex flex-col justify-between h-full ">
          <div className="lg:w-[450px]">
            <h1>Finishing up</h1>
            <p className="text-body mb-[1.25rem] lg:mb-[2.1875rem]">
              Double-check everything looks OK before confirming.
            </p>
            <form onSubmit={handleSubmit} id="stepForm">
              <div className="bg-magnolia  p-4 rounded-[10px] lg:pt-4 lg:pb-6 lg:px-6">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h2 className="text-sm lg:text-base font-medium capitalize text-marine-blue">
                      {formData && formData.plan}
                    </h2>
                    <Link
                      to="/step2"
                      className="underline text-sm text-cool-gray"
                    >
                      Change
                    </Link>
                  </div>
                  <div className="text-marine-blue text-sm lg:text-base font-bold">
                    {formData && formData.price}
                  </div>
                </div>

                {formData &&
                  formData.addons &&
                  formData.addons.map((item) => {
                    return (
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-cool-gray">
                          {capitalizeFirstWord(item.id.split('-').join(' '))}
                        </p>
                        <p className="text-marine-blue text-sm">
                          +{item.price}
                        </p>
                      </div>
                    );
                  })}
              </div>
              <div className="flex justify-between items-center mt-[1.625rem] px-4 lg:px-6">
                <p className="text-cool-gray">
                  Total
                  {formData && formData.subscription === 'monthly'
                    ? ' (per month)'
                    : ' (per year)'}
                </p>
                <p className="text-base lg:text-xl text-purplish-blue font-bold">
                  {formData && formData.subscription === 'monthly'
                    ? `$${total}/mo`
                    : `$${total}/yr`}
                </p>
              </div>
            </form>
          </div>
          <Footer
            prevPath={'/step3'}
            site={'step'}
            form={'stepForm'}
            type={confirm}
          />
        </div>
        {/* Nav */}
        <div className="hidden md:block self-stretch md:min-w-[254px] lg:min-w-[274px] rounded-[10px] overflow-hidden">
          <Navbar />
        </div>
      </Card>
    </div>
  );
}

export default Step4;
