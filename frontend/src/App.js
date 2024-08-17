import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';
import './assets/css/materialdesignicons.min.css';
import Index from './pages';
import JobListOne from './pages/job-list-one';
import JobApply from './pages/job-apply';
import JobPost from './pages/job-post';
import JobDetailOne from './pages/job-detail-one';
import Candidates from './pages/candidates';
import CandidateProfile from './pages/candidate-profile';
import CandidateProfileSetting from './pages/candidate-profile-setting';
import AboutUs from './pages/aboutus';
import Services from './pages/services';
import HelpcenterOverview from './pages/helpcenter-overview';
import HelpcenterFaq from './pages/helpcenter-faqs';
import HelpcenterGuides from './pages/helpcenter-guides';
import HelpcenterSupport from './pages/helpcenter-support';
import Blogs from './pages/blogs';
import BlogSidebar from './pages/blog-sidebar';
import BlogDetail from './pages/blog-detail';
import Login from './pages/login';
import Signup from './pages/signup';
import ResetPassword from './pages/reset-password';
import LockScreen from './pages/lock-screen';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import ContactUs from './pages/contactus';
import Error from './pages/error';
import Comingsoom from './pages/comingsoon';
import Maintenance from './pages/maintenance';
import Logout from './components/logout';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/index' element={<Index />} />

        <Route path='/job-list-one' element={<JobListOne />} />
        <Route path='/job-apply' element={<JobApply />} />
        <Route path='/job-post' element={<JobPost />} />

        <Route path='/job-detail-one' element={<JobDetailOne />} />
        <Route path='/job-detail-one/:id' element={<JobDetailOne />} />

        <Route path='/candidates' element={<Candidates />} />
        <Route path='/candidate-profile' element={<CandidateProfile />} />
        <Route path='/candidate-profile/:id' element={<CandidateProfile />} />
        <Route
          path='/candidate-profile-setting'
          element={<CandidateProfileSetting />}
        />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/services' element={<Services />} />
        <Route path='/helpcenter-overview' element={<HelpcenterOverview />} />
        <Route path='/helpcenter-faqs' element={<HelpcenterFaq />} />
        <Route path='/helpcenter-guides' element={<HelpcenterGuides />} />
        <Route path='/helpcenter-support' element={<HelpcenterSupport />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog-sidebar' element={<BlogSidebar />} />
        <Route path='/blog-detail' element={<BlogDetail />} />
        <Route path='/blog-detail/:id' element={<BlogDetail />} />
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='*' element={<Error />} />
        <Route path='/error' element={<Error />} />
        <Route path='/comingsoon' element={<Comingsoom />} />
        <Route path='/maintenance' element={<Maintenance />} />
      </Routes>
    </>
  );
}

export default App;
