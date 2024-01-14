import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import check from '../assets/icon-thank-you.svg';

function Step5() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const { email, name, phone } = formData;

  const cardRef = useRef(null);

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
      localStorage.setItem('formData', JSON.stringify(formData));
    } else {
      console.log('form not valid');
      return;
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData'));
    if (data) {
      setFormData(data);
    }

    function handleOutsideClick(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        navigate('/');
        localStorage.clear();
      }
    }
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="myContainer">
      <div ref={cardRef}>
        <Card>
          <div className="lg:pl-[6.25rem] lg:pr-[5.25rem] md:pl-10 md:pr-6  text-center  justify-center flex flex-col">
            <div className="my-[3.6125rem] flex flex-col items-center lg:my-0 ">
              <img src={check} alt="" className="w-14 h-14 lg:w-20 lg:h-20" />
              <h1 className="mt-8 mb-[0.875rem]">Thank you!</h1>
              <p className="text-body max-w-[450px]">
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
              </p>
            </div>
          </div>
          {/* Nav */}
          <div className="hidden md:block self-stretch md:min-w-[254px] lg:min-w-[274px] rounded-[10px] overflow-hidden md:h-[568px]">
            <Navbar />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Step5;
