import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateClient } from "aws-amplify/api";
import { getProfile } from "../graphql/queries";

const client = generateClient()

const Profile = ({user}) => {
    const location = useLocation();
    
    // useEffect(() => {
    //     const userId = location.pathname.split[1];
    //     fetchProfile(userId);
    // }, []);
    
    // async function fetchProfile(username) {
    //     const apiData = await client.graphql({ 
    //         query: getProfile,
    //         variables: { username: username } 
    //     });
    //     console.log(apiData);
    // }

    // Get a specific item
    //const oneProfile = await client.graphql({
    //     query: getProfile,
    //     variables: { id: 'YOUR_RECORD_ID' }
    // });

    return (
        <>
            <h1>Profile</h1>
            <p>Username: {user.username}</p>
        </>
    )
}

export default Profile;