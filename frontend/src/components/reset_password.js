import React, { useState, useContext } from 'react';
import axios from 'axios';
import 'react-phone-input-2/lib/bootstrap.css';
import { UserContext } from '../context/UserContext';
import * as Yup from 'yup';

export default function ResetPassword() {
  const { userId } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});

  const passwordSubmit = async (e) => {
    e.preventDefault();

    const passworddata = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      conformPassword: conformPassword,
    };

    try {
      await passwordValidationSchema.validate(passworddata, {
        abortEarly: false,
      });

      setPasswordErrors({});

      const response = await axios.post(
        `http://localhost:8001/profile/passwordReset/${userId}`,
        passworddata,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      console.log(response.data.message || 'Password updated successfully');
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = error.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        setPasswordErrors(errors);
      } else {
        console.error('Error:', error);
      }
    }
  };

  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .min(6, 'New password must be at least 8 characters long')
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'New password must be alphanumeric')
      .required('New password is required'),
    conformPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
      .required('Confirm your new password'),
  });

  return (
    <>
      <div className='col-md-6 mt-4 pt-2'>
        <h5>Change password :</h5>
        <form onSubmit={passwordSubmit}>
          <div className='row mt-4'>
            <div className='col-lg-12'>
              <div className='mb-3'>
                <label className='form-label fw-semibold'>Old password:</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Old password'
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                {passwordErrors.oldPassword && (
                  <div className='text-danger'>
                    {passwordErrors.oldPassword}
                  </div>
                )}
              </div>
            </div>

            <div className='col-lg-12'>
              <div className='mb-3'>
                <label className='form-label fw-semibold'>New password:</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='New password'
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {passwordErrors.newPassword && (
                  <div className='text-danger'>
                    {passwordErrors.newPassword}
                  </div>
                )}
              </div>
            </div>

            <div className='col-lg-12'>
              <div className='mb-3'>
                <label className='form-label fw-semibold'>
                  Confirm new password:
                </label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Confirm new password'
                  required
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
                />
                {passwordErrors.conformPassword && (
                  <div className='text-danger'>
                    {passwordErrors.conformPassword}
                  </div>
                )}
              </div>
            </div>

            <div className='col-lg-12 mt-2 mb-0'>
              <button type='submit' className='btn btn-primary'>
                Change password
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
