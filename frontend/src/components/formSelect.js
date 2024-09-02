import React, { useState } from 'react';
import Select from 'react-select';
import { FiBriefcase, FiSearch } from "../assets/icons/vander";
import countryList from 'react-select-country-list';
import axios from 'axios';

export default function FormSelect({ setFilteredJobs }) {
  const typeOptions = [
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Part Time', label: 'Part Time' },
    { value: 'Freelancer', label: 'Freelancer' },
    { value: 'Remote Work', label: 'Remote Work' },
    { value: 'Office Work', label: 'Office Work' },
  ];

  const [keywords, setKeywords] = useState('');
  const [country, setCountry] = useState(null);
  const [jobCategory, setJobCategory] = useState(null);

  const countryOptions = countryList().getData();

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const params = new URLSearchParams({
        keywords: keywords || '',
        country: country ? country.value : '',
        jobCategory: jobCategory ? jobCategory.value : '', 
      }).toString();

      const response = await axios.get(`http://localhost:8001/job/jobsearch?${params}`);
  
      console.log("Response Data:", JSON.stringify(response.data, null, 2));
  
      if (response.data.results) { 
        setFilteredJobs(response.data.results);
      } else {
        setFilteredJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setFilteredJobs([]);
    }
  };

  return (
    <form className='card-body text-start' onSubmit={handleSearch}>
      <div className='registration-form text-dark text-start'>
        <div className='row g-lg-0'>
          <div className='col-lg-3 col-md-6 col-12'>
            <div className='mb-3 mb-sm-0'>
              <label className='form-label d-none fs-6'>Search :</label>
              <div className='filter-search-form position-relative filter-border'>
                <FiSearch className='fea icon-20 icons' />
                <input
                  type='text'
                  className='form-control filter-input-box bg-light border-0'
                  placeholder='Search your keywords'
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 col-12'>
            <div className='mb-3 mb-sm-0'>
              <label className='form-label d-none fs-6'>Country :</label>
              <Select
                options={countryOptions}
                value={country}
                onChange={setCountry}
                placeholder='Select Country'
                className='select2-container'
              />
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12">
            <div className="mb-3 mb-sm-0">
              <label className="form-label d-none fs-6">Type :</label>
              <div className="filter-search-form relative filter-border">
                <FiBriefcase className="fea icon-20 icons" />
                <Select
                  options={typeOptions}
                  value={jobCategory}
                  onChange={setJobCategory}  
                />
              </div>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 col-12'>
            <button
              type='submit'
              className='btn btn-primary w-100'
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
