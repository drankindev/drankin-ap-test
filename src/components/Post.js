import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { listPosts } from '../graphql/queries';
import PostUpdateForm from './form/PostUpdateForm.jsx';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { EditIcon } from '@heroicons/react/24/outline';

const client = generateClient();

const Post = ({user}) => {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [profile, setProfile] = useState({});
    const [editor,setEditor] = useState(false);

    useEffect(() => {
      fetchPost(postId);
    }, [postId]);

    // useEffect(() => {
    //   fetchProfile(post.profileID);
    // }, [post]);

    async function fetchPost(postId) {
      try {
        const apiData = await client.graphql({ 
          query: listPosts,
          filter: { postId: postId }
        });
        const data = apiData.data.listPosts.items;
        setPost(data[0]);
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <>
          {editor && <PostUpdateForm id={post.id} setEditor={setEditor} onSuccess={(e) => {fetchPost(postId)}} />}
          <section className="my-8 py-8 mx-auto w-auto max-w-6xl">
            {post &&
              <>
                <h1>
                  {post.title}
                  { post.profileId === user.username &&
                    <button className="" onClick={() => setEditor(true)} title="edit">Edit</button>
                  }
                  </h1>
                <p>{dayjs(post.createdAt).format('MM/DD/YYY')} - {post.profileId}</p>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />  
              </>
            }         
          </section>  
        </>
    )
}

export default Post;