import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import './tailwind.generated.css';
import "@aws-amplify/ui-react/styles.css";

import { withAuthenticator, View } from "@aws-amplify/ui-react";
import Posts from './components/Posts';
import Post from './components/Post';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

function App({signOut, user}) {
  return (
    <>  
    <View className="App">     
      <BrowserRouter>
        <Header signOut={signOut}/>
        <div className="flex text-left pt-20 pb-4 sm:pb-8 bg-white sm:bg-blue-50 min-h-screen">
          <Routes>
              <Route path="/" element={<Navigate to="/posts" replace />} />
              <Route path="/posts" element={<Posts user={user} />} />
              <Route path="/posts/:blogId" element={<Posts user={user} />} />
              <Route path="/post/:postId" element={<Post user={user}/>} />
              <Route path="/profile" element={<Profile user={user}/>} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>      
    </View>
    </>
  );
}

export default withAuthenticator(App);