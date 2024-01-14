import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import arcadeIcon from '../assets/icon-arcade.svg';
import advancedIcon from '../assets/icon-advanced.svg';
import proIcon from '../assets/icon-pro.svg';

function Step2() {
  const [selectedPlan, setSelectedPlan] = useState('arcade');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const navigate = useNavigate();

  const plans = [
    {
      id: 'arcade',
      name: 'Arcade',
      price: '$9/mo',
      priceYear: '$90/yr',
      icon: arcadeIcon,
    },
    {
      id: 'advanced',
      name: 'Advanced',
      price: '$12/mo',
      priceYear: '$120/yr',
      icon: advancedIcon,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$15/mo',
      priceYear: '$150/yr',
      icon: proIcon,
    },
  ];

  const defaultPlan = plans.find((plan) => plan.id === 'arcade');

  const [formData, setFormData] = useState({
    plan: defaultPlan.id,
    price: isToggled ? defaultPlan.priceYear : defaultPlan.price,
  });

  console.log(formData);

  function handleSubmit(e) {
    e.preventDefault();

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      navigate('/step3');
      return updatedFormData;
    });

    try {
      setSubmitted(true);

      navigate('/step3');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem('formData'));

    storedData = {
      ...storedData,
      plan: 'arcade',
      price: '$9/mo',
    };

    setFormData((prevData) => ({
      ...prevData,
      ...storedData,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  function handlePlanChange(e) {
    const newPlan = e.target.value;
    const plan = plans.find((plan) => plan.id === newPlan); // Use newPlan instead of selectedPlan

    setSelectedPlan(newPlan);

    const updatedFormData = {
      ...formData,
      plan: newPlan,
      price: isToggled ? plan.priceYear : plan.price,
      subscription: isToggled ? 'yearly' : 'monthly',
    };

    setFormData(updatedFormData); // Update formData state
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  }

  function handleToggle() {
    const newToggle = !isToggled;
    setIsToggled(newToggle);

    const plan = plans.find((plan) => plan.id === selectedPlan);

    console.log(plan);
    console.log(newToggle);

    const updatedFormData = {
      ...formData,
      price: newToggle ? plan.priceYear : plan.price,
      subscription: newToggle ? 'yearly' : 'monthly',
    };

    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  }

  return (
    <div className="myContainer h-full">
      <Card>
        {/* Form */}
        <div className="lg:pl-[6.25rem] lg:pr-[5.25rem] md:pl-10 md:pr-6 md:pt-10 md:pb-4 flex flex-col justify-between lg:h-full w-full">
          <div>
            <h1>Select your plan</h1>
            <p className="text-body mb-[1.25rem] lg:mb-[2.1875rem]">
              You have the option of monthly or yearly billing.
            </p>
            <form onSubmit={handleSubmit} id="stepForm">
              <div className="lg:flex gap-[1.125rem] justify-between">
                {plans.map((plan) => (
                  <div className="form-control" key={plan.id}>
                    <label
                      htmlFor={plan.id}
                      className={`flex items-start lg:flex-col rounded-lg bg-magnolia px-4 pt-[0.875rem] pb-[1.125rem] lg:pt-5 lg:pl-4 lg:w-[138px] gap-[0.875rem] mb-3 lg:mb-0 ${
                        selectedPlan === plan.id
                          ? ' border-purplish-blue border'
                          : 'border border-transparent'
                      }`}
                    >
                      <img src={plan.icon} alt={plan.name} />
                      <div>
                        <h2 className="mb-[0.4375rem] font-medium text-marine-blue lg:mt-10">
                          {plan.name}
                        </h2>
                        <p className="text-cool-gray text-sm">
                          {!isToggled ? plan.price : plan.priceYear}
                        </p>
                        {isToggled ? (
                          <p className="text-xs text-marine-blue mt-[0.1875rem]">
                            2 months free
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                    </label>
                    <input
                      type="radio"
                      name="plan"
                      id={plan.id}
                      value={plan.id}
                      onChange={handlePlanChange}
                      className="sr-only"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center rounded-lg bg-magnolia py-[0.875rem] mt-6 lg:mt-8">
                <span className="mr-6">Monthly</span>
                <input
                  type="checkbox"
                  id="toggle"
                  checked={isToggled}
                  onChange={handleToggle}
                  className="hidden"
                />
                <label
                  htmlFor="toggle"
                  className={`cursor-pointer inline-block w-[2.375rem] h-5  transform bg-marine-blue rounded-full `}
                >
                  <span
                    className={`absolute w-3 h-3  ml-1 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out top-[50%] translate-y-[-50%]  ${
                      isToggled ? 'translate-x-[1.125rem]' : ''
                    }`}
                  />
                </label>
                <span className="ml-6">Yearly</span>
              </div>
            </form>
          </div>
          <Footer prevPath={'/'} site={'step2'} form={'stepForm'} />
        </div>
        {/* Nav */}
        <div className="hidden md:block self-stretch md:min-w-[254px] lg:min-w-[274px] rounded-[10px] overflow-hidden">
          <Navbar />
        </div>
      </Card>
    </div>
  );
}

export default Step2;
