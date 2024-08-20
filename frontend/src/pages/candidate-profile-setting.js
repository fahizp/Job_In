import React, { useState } from 'react';
import axios from 'axios';
import image1 from '../assets/images/team/01.jpg';
import bg1 from '../assets/images/hero/bg5.jpg';
import NavbarDark from '../components/navbarDark';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';
import { FiCamera } from '../assets/icons/vander';

export default function CandidateProfileSetting() {
  const [timeLine, setTimeLine] = useState({ startYear: '', endYear: '' });
  const [cv, setCv] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [df, setDf] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [range, setRange] = useState("");
  const [profileFile, setProfileFile] = useState(image1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [indroduction, setIndroduction] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(image1);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [banner, setBanner] = useState(bg1);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);



  const Submit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("title", title);
    data.append("range", range);
    data.append("city", city);
    data.append("country", country);
    data.append("dateOfBirth", dateOfBirth);
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("occupation", occupation);
    data.append("mobileNumber", mobileNumber);
    data.append("address", address);
    data.append("location", location);
    data.append("indroduction", indroduction);
    data.append("role", role);
    data.append("salary", salary);
    data.append("description", description);
  
    if (cv) data.append("cv", cv);
    if (logo) data.append("logo", logo);
    if (profilePhoto) data.append("profilePhoto", profilePhoto);
    if (banner) data.append("banner", banner);
  
    const skillsArray = [];
    skills.forEach((skill, index) => {
      skillsArray.push({ title: skill.title, range: skill.range });
    });
    
    data.append("skills", JSON.stringify(skillsArray));
  
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const response = await axios.post("http://localhost:8001/candidate/submit", data);
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        console.error("Error details:", err.response.data);
      } else {
        console.error("No response data");
      }
    }
  };
  




  const handleAddSkill = () => {
    setSkills([...skills, { title: "", range: "" }]);
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimeLine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCvChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected CV file:", file); 
    if (file) {
      setCv(file);

    }
  };

  const handleBannerChange = (e) => {
    const selectedBanner = e.target.files[0];
    if (selectedBanner) {
      setBanner(selectedBanner);
      setBannerFile(URL.createObjectURL(selectedBanner));
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected Logo file:", file); 
    if (file) { 
      setLogo(file)
      setLogoFile(URL.createObjectURL(file));

    }
  };

  const handleProfilePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected Profile Photo file:", selectedFile); // Log selected Profile Photo file
    if (selectedFile) {
      setProfilePhoto(selectedFile); // Store file object
      setProfileFile(URL.createObjectURL(selectedFile)); // Display preview
    }
  };

  return (
    <>
      <NavbarDark />
      <section className='section'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='position-relative'>
                <div className='candidate-cover'>
                  <div className='profile-banner relative text-transparent'>
                    <input id='pro-banner' type='file' onChange={handleBannerChange} style={{ display: 'none' }} />
                    <div className='relative shrink-0'>
                      <img
                        src={bannerFile || banner}
                        className='rounded shadow'
                        id='profile-banner'
                        alt='Banner'
                      />
                      <label
                        className='profile-image-label'
                        htmlFor='pro-banner'
                      >
                        <span className='btn btn-icon btn-sm btn-pills btn-primary'>
                          <FiCamera className='icons' />
                        </span>
                      </label>
                    </div>
                  </div>

                  <form onSubmit={Submit} className='position-relative'>

                    <input
                      type='file'
                      onChange={handleProfilePhotoChange}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: '0.01',
                        zIndex: '11',
                      }}
                    />
                    <div className='position-relative d-inline-block'>
                      <img
                        src={profileFile || 'default-profile-image-url'} // Replace with default profile image
                        className='avatar avatar-medium img-thumbnail rounded-pill shadow-sm'
                        id='profile-image'
                        alt='Profile'
                      />
                      <label
                        className='icons position-absolute bottom-0 end-0'
                        htmlFor='pro-img'
                      >
                        <span className='btn btn-icon btn-sm btn-pills btn-primary'>
                          <FiCamera className='icons' />
                        </span>
                      </label>
                    </div>
                    
                  </form>

                  <div className='ms-2'>
                    <h5 className='mb-0'>Mr. Calvin Carlo</h5>
                    <p className='text-muted mb-0'>Web Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='rounded shadow p-4'>
                <form onSubmit={Submit}>
                  <div className='rounded shadow p-4 mt-4'>
                    <h5>Personal Detail :</h5>
                    <div className='row mt-4'>
                      {/* Personal Details Form Fields */}
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            First Name<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='firstName'
                            id='firstName'
                            type='text'
                            className='form-control'
                            placeholder='First Name:'
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Last Name<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='lastName'
                            id='lastName'
                            type='text'
                            className='form-control'
                            placeholder='Last Name:'
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Email<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='email'
                            id='email'
                            type='email'
                            className='form-control'
                            placeholder='Email:'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Mobile Number<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='mobileNumber'
                            id='mobileNumber'
                            type='text'
                            className='form-control'
                            placeholder='Mobile Number:'
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Occupation<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='occupation'
                            id='occupation'
                            type='text'
                            className='form-control'
                            placeholder='Occupation:'
                            onChange={(e) => setOccupation(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Date of Birth<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='dateOfBirth'
                            id='dateOfBirth'
                            type='date'
                            className='form-control'
                            placeholder='Date of Birth:'
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Country<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='country'
                            id='country'
                            type='text'
                            className='form-control'
                            placeholder='Country:'
                            onChange={(e) => setCountry(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            City<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='city'
                            id='city'
                            type='text'
                            className='form-control'
                            placeholder='City:'
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                          Address<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='Address'
                            id='Address'
                            type='text'
                            className='form-control'
                            placeholder='Address:'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                            Upload CV<span className='text-danger'>*</span>
                          </label>
                          <input
                            type='file'
                            accept='.pdf'
                            onChange={handleCvChange}
                          />
                        </div>
                      </div>

                      <div className='col-md-12'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                          indroduction<span className='text-danger'>*</span>
                          </label>
                          <textarea
                            name='indroduction'
                            id='indroduction'
                            rows='3'
                            className='form-control'
                            placeholder='indroduction'
                            onChange={(e) =>setIndroduction(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <h5>Experience :</h5>
                      <div className='col-md-6'>
  <div className='mb-3'>
    <label className='form-label fw-semibold'>
      Upload Logo<span className='text-danger'>*</span>
    </label>
    <input
      type='file'
      accept='image/*'
      className='form-control'
      onChange={handleLogoChange}
    />
  </div>
  {logo && (
    <div>
      <img src={logoFile} alt='Uploaded Logo' style={{ maxWidth: '100px', maxHeight: '100px' }} />
    </div>
  )}
</div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                          role<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='role'
                            id='role'
                            type='text'
                            className='form-control'
                            placeholder='role:'
                            onChange={(e) => setRole(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                          location<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='location'
                            id='location'
                            type='text'
                            className='form-control'
                            placeholder='location:'
                            onChange={(e) => setLocation(e.target.value)}
                            required
                          />
                        </div>
                      </div>


                      

                      <div className='col-md-6'>
      <div className='mb-3'>
        <label className='form-label fw-semibold'>
        TimeLine  <span className='text-danger'>*</span>
        </label>
        <div className='d-flex'>
          <input
            type='number'
            name='startYear'
            className='form-control me-2'
            placeholder='Start Year'
            value={timeLine.startYear}
            onChange={handleInputChange}
            min='1900'
            max={new Date().getFullYear()}
            required
          />
          <input
            type='number'
            name='endYear'
            className='form-control'
            placeholder='End Year'
            value={timeLine.endYear}
            onChange={handleInputChange}
            min='1900'
            max={new Date().getFullYear()}
            required
          />
        </div>
      </div>
    </div>


                     <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                          salary<span className='text-danger'>*</span>
                          </label>
                          <input
                            name='salary'
                            id='mobileNumber'
                            type='text'
                            className='form-control'
                            placeholder='salary:'
                            onChange={(e) => setSalary(e.target.value)}
                            required
                          />
                        </div>
                      </div>


                      <div className='col-md-12'>
                        <div className='mb-3'>
                          <label className='form-label fw-semibold'>
                          description<span className='text-danger'>*</span>
                          </label>
                          <textarea
                            name='description'
                            id='description'
                            rows='3'
                            className='form-control'
                            placeholder='description'
                            onChange={(e) =>setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <h5 className='mb-0'>Skills</h5>
              {skills.map((skill, index) => (
                <div key={index} className='row'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label className='form-label fw-semibold'>
                        Title<span className='text-danger'>*</span>
                      </label>
                      <input
                        name={`title-${index}`}
                        type='text'
                        className='form-control'
                        placeholder='Title'
                        value={skill.title}
                        onChange={(e) => handleSkillChange(index, 'title', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label className='form-label fw-semibold'>
                        Range<span className='text-danger'>*</span>
                      </label>
                      <input
                        name={`range-${index}`}
                        type='text'
                        className='form-control'
                        placeholder='Range'
                        value={skill.range}
                        onChange={(e) => handleSkillChange(index, 'range', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='col-md-12 text-end'>
                    <button type='button' className='btn btn-danger' onClick={() => handleRemoveSkill(index)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className='text-center'>
                <button type='button' className='btn btn-secondary mt-2' onClick={handleAddSkill}>
                  Add Skill
                </button>
              </div>
                     
                    </div>
                    <div className='text-center'>
                      <button type='submit' className='btn btn-primary mt-2'>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollTop />
    </>
  );
}
