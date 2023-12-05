import React, {useState, useEffect} from 'react';
import ImageUploader from './form/ImageUploader';
import { fetchPostList } from './common/utils';
import PostList from './common/PostList';
import { fetchUserAttributes, updateUserAttribute  } from 'aws-amplify/auth';

const Profile = ({user}) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [image, setImage] = useState('');

    useEffect(() => {
        fetchPostList({onSuccess: setPosts});
        handleFetchUserAttributes();
    }, []);

    useEffect(() => {
        let tmpPosts = posts;
        tmpPosts = tmpPosts.filter(post => post.profileId === user.username);

        setFilteredPosts(tmpPosts);
    }, [posts,user]);

    useEffect(() => {
        async function handleUpdateUserAttribute(attributeKey, value) {
            try {
                await updateUserAttribute({
                    userAttribute: { attributeKey, value }
                });
            } catch (error) {
                console.log(error);
            }
        }
        handleUpdateUserAttribute('picture',image);
    }, [image]);


    async function handleFetchUserAttributes() {
        try {
            const userAttributes = await fetchUserAttributes();
            if (userAttributes.picture) {
                setImage(userAttributes.picture)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="relative my-8 p-4 mx-auto w-full max-w-2xl rounded drop-shadow bg-white">
            <div className="flex gap-8 mb-4 w-full border-b border-b-black pb-4">
                <h1 className="font-bebas text-2xl font-roboto font-bold text-red-700">{user.username}</h1> 
            </div>

            <ImageUploader image={image} setImage={setImage}/>  

            { posts &&
            <>
                <h4 className="font-bebas text-base text-red-700 font-bold w-full inline-block mt-8 border-b border-b-black pb-1">Your posts</h4>
                <PostList posts={filteredPosts}/> 
            </>
            }
        </section>  
    )
}

export default Profile;