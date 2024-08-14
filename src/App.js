import React, { Suspense } from 'react';
import NavBar from './components/NavBar';
import Home from './home';
import { HashRouter, Routes, Route } from "react-router-dom";

import News from './news';
import Browse from './browse';
import Movie from './movie';
import Login from './login';
import Membership from './membership';
import SignUpInfo from './signUpInfo';
import SignUpPay from './signUpPay';
import Help from './help';

import i18n from './i18n'; // Import i18n
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider

import './App.css';
import './CustomScrollbar.css';


const App = () => {
  return (
    <I18nextProvider i18n={i18n}> {/* Wrap your app in I18nextProvider */}
      <Suspense fallback="Loading..."> {/* Wrap your app in Suspense */}
        <HashRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path='/login' element={<Login />} />
            <Route path='/membership' element={<Membership />} />
            <Route path='/personal-info' element={<SignUpInfo />} />
            <Route path='/payment-info' element={<SignUpPay />} />
            <Route path='/help' element={<Help />} />
          </Routes>
        </HashRouter>
      </Suspense>
    </I18nextProvider>
  );
};

export default App;
