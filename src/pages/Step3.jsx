import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import arcadeIcon from '../assets/icon-arcade.svg';
import advancedIcon from '../assets/icon-advanced.svg';
import proIcon from '../assets/icon-pro.svg';

function Step3() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

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

  const [selectedAddons, setSelectedAddons] = useState(
    plans.reduce((acc, plan) => ({ ...acc, [plan.id]: false }), {})
  );

  function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitted(true);

      localStorage.setItem('formData', JSON.stringify(formData));

      navigate('/step4');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData'));

    if (!data.addons) {
      data.addons = Object.entries(selectedAddons)
        .filter(([key, value]) => value)
        .map(([key]) => {
          const selectedPlan = plans.find((plan) => plan.id === key);
          return {
            id: key,
            price: isToggled ? selectedPlan.priceYear : selectedPlan.price,
          };
        });
    }

    if (data) {
      setIsToggled(data.subscription === 'monthly' ? false : true);
      if (!data.subscription) {
        data.subscription = 'monthly';
      }

      console.log(data);

      const restoredAddons = plans.reduce((acc, plan) => {
        acc[plan.id] = data.addons.some((addon) => addon.id === plan.id);
        return acc;
      }, {});

      localStorage.setItem('formData', JSON.stringify(data));
      setFormData(data);
      setSelectedAddons(restoredAddons);
    }
  }, []);

  function handleAddonChange(e) {
    const addon = e.target.value;
    setSelectedAddons((prev) => {
      const updatedAddons = { ...prev, [addon]: e.target.checked };
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          addons: Object.entries(updatedAddons)
            .filter(([key, value]) => value)
            .map(([key]) => {
              const selectedPlan = plans.find((plan) => plan.id === key);
              return {
                id: key,
                price: isToggled ? selectedPlan.priceYear : selectedPlan.price,
              };
            }),
        };
        // Update localStorage
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
        return updatedFormData;
      });
      return updatedAddons;
    });
  }

  function isPlanSelected(planId) {
    return (
      formData.addons && formData.addons.some((addon) => addon.id === planId)
    );
  }

  return (
    <div className="myContainer">
      <Card>
        {/* Form */}
        <div className="md:pl-10 md:pr-6 w-full lg:pl-[6.25rem] lg:pr-[5.25rem] md:pt-10 md:pb-4 flex flex-col justify-between">
          <div className='className="lg:w-[450px] '>
            <h1>Pick add-ons</h1>
            <p className="text-body mb-[1.25rem] lg:mb-[2.1875rem]">
              Add-ons help enhance your gaming experience.
            </p>
            <form onSubmit={handleSubmit} id="stepForm">
              <div className="w-full">
                {plans.map((plan) => (
                  <div className="form-control" key={plan.id}>
                    <label
                      htmlFor={plan.id}
                      className={`flex items-center justify-between  rounded-lg bg-magnolia px-4 pt-[0.875rem] pb-[1.125rem] lg:w-[450px]  gap-[0.875rem] mb-3 ${
                        selectedAddons[plan.id]
                          ? ' border-purplish-blue border'
                          : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          name="plan"
                          id={plan.id}
                          value={plan.id}
                          checked={isPlanSelected(plan.id)}
                          onChange={handleAddonChange}
                          className=""
                        />
                        <div>
                          <h2 className="mb-[0.4375rem] font-medium text-marine-blue ">
                            {plan.name}
                          </h2>
                          <p className="text-cool-gray text-sm">{plan.text}</p>
                        </div>
                      </div>
                      <p className="text-purplish-blue">
                        +{formData.subscription ? plan.priceYear : plan.price}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
          <Footer prevPath={'/step2'} site={'step2'} form={'stepForm'} />
        </div>
        {/* Nav */}
        <div className="hidden md:block self-stretch md:min-w-[254px] lg:min-w-[274px] rounded-[10px] overflow-hidden">
          <Navbar />
        </div>
      </Card>
    </div>
  );
}

export default Step3;
