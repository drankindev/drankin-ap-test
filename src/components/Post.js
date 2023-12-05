import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { fetchBlogList, getPost } from './common/utils';
import PostUpdateForm from './form/PostUpdateForm.jsx';
import ConfirmDeletePost from './form/ConfirmDeletePost.jsx';
import CommentCreateForm from './form/CommentCreateForm.jsx';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getUrl, list } from 'aws-amplify/storage';
import CommentList from './common/CommentList';

const client = generateClient();

const Post = ({user}) => {
  const { postId } = useParams();
  const [status, setStatus] = useState('idle');
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [editor,setEditor] = useState(false);
  const [deleteConfirm,setDeleteConfirm] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiData = await client.graphql({ 
          query: getPost,
          variables: { id: postId }
        });
        const data = apiData.data.getPost;
        console.log(data)
        setPost(data);
        if(data.image) {
          validateImage(data.image);
        }
      } catch (err) {
        console.log(err);
      }
    }
    const validateImage = async (filename) => {
      try {
        const validUrl = await list({
          prefix: filename
        });
        if (validUrl.items.length > 0) {
          const res = await getUrl({
            key: filename,
            options: {
              accessLevel: 'public',
            }
          });
          setImageUrl(res.url.toString());
        }
      } catch (err) {
        console.log('error',err);
      }
    }
    fetchBlogList({onSuccess: setBlogs});
    fetchPost();
    setStatus('idle');
  }, [postId, status]);

  return (
    <>
      {editor && <PostUpdateForm id={post.id} blogList={blogs} setEditor={setEditor} setStatus={setStatus} />}
      {deleteConfirm && <ConfirmDeletePost post={post} setDeleteConfirm={setDeleteConfirm} />}

      <section className="relative my-8 p-4 mx-auto w-full max-w-2xl rounded drop-shadow bg-white">
        {post &&
          <>
            <div className="flex gap-8 mb-4 w-full border-b border-b-black pb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-roboto font-bold text-red-700 leading-6">{post.title}</h1>
              <p className="text-xs mt-1"><i>{post.createdAt && dayjs(post.createdAt.substring(0, 10)).format('MM-DD-YYYY')}</i> &bull; {post.profileId}</p>
            </div>
            { post.profileId === user.username &&
              <div className="flex flex-none gap-2 relative">
                <button className="rounded-full text-white w-8 h-8 p-1 bg-green-700 hover:bg-black" onClick={() => setEditor(true)} title="edit"><PencilIcon className="w-6 h-6"/></button>
                <button className="rounded-full text-white w-8 h-8 p-1 bg-red-700 hover:bg-black" onClick={() => setDeleteConfirm(true)} title="delete"><TrashIcon className="w-6 h-6"/></button>
              </div>
            }
              
            </div>
            {imageUrl &&
              <img className="mb-4" src={imageUrl} alt={post.title}/>
            }
            <div dangerouslySetInnerHTML={{ __html: post.body }} />  

            <div className="mt-8">
              
                <div>
                  <h3 className="font-bebas text-base text-red-700 font-bold w-full inline-block">Comments</h3>
                  <CommentCreateForm targetPost={post} user={user} onSuccess={(e) => setStatus('refresh')}/>
                  { post.comments && post.comments.items.length > 0 &&
                   <CommentList user={user} post={post} comments={post.comments.items} onSuccess={(e) => setStatus('refresh')}/>
                  }
                </div>
            </div>
          </>
        }         
      </section>  
    </>
  )
}

export default Post;