import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import CompletionContext from './context/CompletionContext';

function Step1() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { setStepCompletion } = useContext(CompletionContext);

  const { email, name, phone } = formData;

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = 'This field is required';
      isValid = false;
    }

    if (!name) {
      newErrors.name = 'This field is required';
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = 'This field is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      console.log('valid form');
      setSubmitted(true);
      navigate('/step2');
      setStepCompletion(true);
      localStorage.setItem('formData', JSON.stringify(formData));
    } else {
      console.log('form not valid');
      return;
    }
  }

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData'));
    if (data && data.email && data.name && data.phone) {
      setFormData(data);
    } else {
      setFormData({
        email: '',
        name: '',
        phone: '',
      });
    }
  }, []);

  return (
    <div className="myContainer">
      <Card>
        {/* Form */}
        <div className="md:pl-10 md:pr-6 lg:pl-[6.25rem] lg:pr-[5.25rem] md:pt-10 md:pb-4 flex flex-col justify-between">
          <div className="lg:w-[450px]">
            <h1>Personal info</h1>
            <p className="text-body mb-[1.25rem] lg:mb-[2.1875rem]">
              Please provide your name, email address, and phone number.{' '}
            </p>
            <form onSubmit={handleSubmit} id="stepForm">
              <div className="input-control">
                <label className="block mb-[0.375rem]" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full border border-cool-gray px-4 py-3 rounded fs-300"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. Stephen King"
                  onChange={handleInputChange}
                  value={formData.name}
                />
                {errors.name && (
                  <small className="text-strawberry-red">{errors.name}</small>
                )}
              </div>
              <div className="input-control mt-4">
                <label className="block mb-[0.375rem]" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full border border-cool-gray rounded px-4 py-3 fs-300"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. stephenking@lorem.com"
                  onChange={handleInputChange}
                  value={formData.email}
                />
                {errors.email && (
                  <small className="text-strawberry-red">{errors.email}</small>
                )}
              </div>
              <div className="input-control mt-4">
                <label className="block mb-[0.375rem]" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="w-full border border-cool-gray rounded px-4 py-3 fs-300"
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="e.g. + 1 234 567 890"
                  onChange={handleInputChange}
                  value={formData.phone}
                />
                {errors.phone && (
                  <small className="text-strawberry-red">{errors.phone}</small>
                )}
              </div>
            </form>
          </div>
          <Footer prevPath={'/step1'} site={'step1'} form={'stepForm'} />
        </div>
        {/* Nav */}
        <div className="hidden md:block self-stretch md:min-w-[254px] lg:min-w-[274px] rounded-[10px] overflow-hidden">
          <Navbar />
        </div>
      </Card>
    </div>
  );
}

export default Step1;
