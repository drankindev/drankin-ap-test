import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { getPost } from '../graphql/queries';
import { fetchBlogList } from './common/utils';
import PostUpdateForm from './form/PostUpdateForm.jsx';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const client = generateClient();

const Post = ({user}) => {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [editor,setEditor] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      fetchBlogList({onSuccess: setBlogs});
    }, []);

    useEffect(() => {
      fetchPost(postId);
    }, [postId]);

    async function fetchPost(postId) {
      try {
        const apiData = await client.graphql({ 
          query: getPost,
          variables: { id: postId }
        });
        const data = apiData.data.getPost;
        console.log(data);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    }
    // async function fetchBlogList() {
    //   try {
    //     const apiData = await client.graphql({ query: listBlogs });
    //     const BlogsFromAPI = apiData.data.listBlogs.items;
    //     setBlogs(BlogsFromAPI);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    return (
        <>
          {editor && <PostUpdateForm id={post.id}  blogList={blogs} setEditor={setEditor} onSuccess={(e) => {fetchPost(postId)}} />}
          <section className="relative my-8 p-4 mx-auto w-full max-w-2xl rounded drop-shadow bg-white">
            {post &&
              <>
                <div className="mb-4 w-full border-b border-b-black pb-4">
                <h1 className="text-2xl font-roboto font-bold text-red-700">{post.title}</h1>
                
                { post.profileId === user.username &&
                  <div className="flex gap-2 absolute right-4 top-4">
                    <button className="rounded-full text-white w-8 h-8 p-1 bg-green-700 hover:bg-black" onClick={() => setEditor(true)} title="edit"><PencilIcon className="w-6 h-6"/></button>
                    <button className="rounded-full text-white w-8 h-8 p-1 bg-red-700 hover:bg-black" onClick={() => setEditor(true)} title="delete"><TrashIcon className="w-6 h-6"/></button>
                  </div>
                }
                  
                <p className="text-xs"><i>{post.createdAt && dayjs(post.createdAt.substring(0, 10)).format('MM-DD-YYYY')}</i> &bull; {post.profileId}</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />  
              </>
            }         
          </section>  
        </>
    )
}

export default Post;