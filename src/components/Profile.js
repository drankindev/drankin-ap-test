import React, {useState, useEffect} from 'react';
import ProfileUpdateForm from './form/ProfileUpdateForm';
import { fetchPostList, validateImage } from './common/utils';
import PostList from './common/PostList';
import StatusDisplay from './common/StatusDisplay';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { PencilIcon } from '@heroicons/react/24/outline';

const Profile = ({user}) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [userAttributes, setUserAttributes] = useState({})
    const [editor, setEditor] = useState(false);
    const [status, setStatus] = useState('idle');
    const [imageUrl, setImageUrl] = useState();
    const [message, setMessage] = useState('');

    // on init fetch user data
    useEffect(() => {
        fetchPostList({onSuccess: setPosts});
        async function handleFetchUserAttributes() {
            try {
                const userAttributes = await fetchUserAttributes();
                setUserAttributes(userAttributes);
            } catch (error) {
                console.log('error',error);
            }
        }
        handleFetchUserAttributes();
    }, []);

    // filter posts by current user
    useEffect(() => {
        let tmpPosts = posts.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
        tmpPosts = tmpPosts.filter(post => post.profileId === user.username);
        setFilteredPosts(tmpPosts);
    }, [posts,user]);
    
    // set user's image after validating
    useEffect(() => {
        if (userAttributes.picture) {
            validateImage({onSuccess: setImageUrl, filename: userAttributes.picture});
        } else {
            setImageUrl(null)
        }
    },[userAttributes]);

    return (
        <>
            {editor && <ProfileUpdateForm user={user} userAttributes={userAttributes} setUserAttributes={setUserAttributes} setEditor={setEditor} setStatus={setStatus} setMessage={setMessage} />}
            {message && <StatusDisplay setStatus={setStatus} setMessage={setMessage} message={message}/>}
            <section className="relative z-0 sm:my-8 p-4 mx-auto w-full max-w-2xl sm:rounded sm:drop-shadow bg-white">
                <div className="flex gap-8 mb-4 w-full border-b border-b-black pb-4">
                    <h1 className="flex-1 font-bebas text-2xl font-bold text-orange-500">{user.username}</h1> 
                    <div className="flex flex-none">
                    <button className="rounded-full text-white w-8 h-8 p-1 bg-green-700 hover:bg-black" onClick={() => setEditor(true)} title="edit"><PencilIcon className="w-6 h-6"/></button>
                    </div>
                </div>    
                <p>
                    {imageUrl && <img className="rounded float-right w-1/2 h-auto mb-4 ml-4" src={imageUrl} alt={user.username}/>}
                    {userAttributes.profile}
                </p>
                { posts &&
                <>
                    <h4 className="font-bebas text-base text-orange-500 font-bold w-full inline-block mt-8 border-b border-b-black pb-1">Your posts</h4>
                    <PostList posts={filteredPosts}/> 
                </>
                }
            </section> 
        </> 
    )
}

export default Profile;