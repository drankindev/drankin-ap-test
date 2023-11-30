import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './tailwind.generated.css';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  View,
} from "@aws-amplify/ui-react";

import Layout from './components/Layout';
import Home from './components/Home';
import Profile from './components/Profile';
import CategoriesListEdit from './components/CategoriesListEdit';
import NotFound from './components/NotFound';
import Header from './components/Header';

function App({signOut, user}) {
  return (
    <>  
    <View className="App">     
      <BrowserRouter>
        <Header signOut={signOut} user={user}/>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile/:profileId" element={<Profile user={user}/>} />
            <Route path="/categories" element={<CategoriesListEdit />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>      
    </View>
    </>
  );
}

export default withAuthenticator(App);