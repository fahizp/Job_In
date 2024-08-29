import React, { useState, useContext } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { UserContext } from '../context/UserContext';

export default function Contactinfo({ contactDetails }) {
  if (!contactDetails) return null;

  const { userId } = useContext(UserContext);
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const contactSchema = Yup.object().shape({
    mobile: Yup.string()
      .required('Mobile number is required')
  });
  

  const contactSubmit = async (e) => {
    e.preventDefault();

    const contactdata = {
      mobile: phone,
      website: website,
    };

    try {
      await contactSchema.validate(contactdata, { abortEarly: false });

      const response = await axios.post(
        `http://localhost:8001/profile/ContactInfo/${userId}`,
        contactdata,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      toast.success(
        response.data.message || 'Contact info updated successfully',
      );
      setError(''); 
    } catch (validationError) {
      if (validationError.name === 'ValidationError') {
        setError(validationError.errors[0]);
      } else {
        toast.error(validationError.response?.data?.message || 'An error occurred.');
      }
    }
  };

  return (
    <>
      <div className='col-md-6 mt-4 pt-2'>
        <h5>Contact Info :</h5>
        <h6 className="web">Number : <span>+{contactDetails.mobile || 'N/A'}</span></h6>

        <form onSubmit={contactSubmit}>
          <div className='row mt-4'>
            <div className='col-lg-12 mb-3'>
              {error && <p className="text-danger">{error}</p>}
              <PhoneInput
                country={'eg'}
                className='mb-4'
                enableSearch={true}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>

            <div className='col-lg-12'>
              <h6 className="web mt-5">Website : <span>{contactDetails.website || 'N/A'}</span></h6>
              <div className='mb-5'>
                <input
                  name='url'
                  id='url'
                  type='url'
                  className='form-control mt-3'
                  value={website}
                  placeholder='Website'
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className='col-lg-12 mt-2 mb-0'>
              <button type='submit' className='btn btn-primary'>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
