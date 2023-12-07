import React, { useState, useEffect } from 'react';
import { fetchBlogList, fetchPost, validateImage } from './common/utils';
import PostUpdateForm from './form/PostUpdateForm.jsx';
import ConfirmDeletePost from './form/ConfirmDeletePost.jsx';
import CommentCreateForm from './form/CommentCreateForm.jsx';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import CommentList from './common/CommentList';
import StatusDisplay from './common/StatusDisplay.js';
import DOMPurify from 'dompurify';

const Post = ({user}) => {
  const { postId } = useParams();
  const [status, setStatus] = useState('idle');
  const [post, setPost] = useState({});
  const [editor,setEditor] = useState(false);
  const [deleteConfirm,setDeleteConfirm] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [message, setMessage] = useState('');

  // get blog and post data
  useEffect(() => {
    fetchBlogList({onSuccess: setBlogs});
    fetchPost({postId: postId, onSuccess: setPost});
  }, [postId]);

  // update post on refresh
  useEffect(() => {
    if (status === 'refresh') {
      fetchPost({postId: postId, onSuccess: setPost, status: status});
      setStatus('idle');
    }
  }, [postId,status]);

  //validate image after getting post
  useEffect(() => {
    if(post.image) {
      validateImage({onSuccess: setImageUrl, filename: post.image});
    }
  },[post]);

  return (
    <>
      {editor && <PostUpdateForm id={post.id} blogList={blogs} setEditor={setEditor} setStatus={setStatus} setMessage={setMessage}/>}
      {deleteConfirm && <ConfirmDeletePost post={post} setDeleteConfirm={setDeleteConfirm} />}
      {message && <StatusDisplay setStatus={setStatus} setMessage={setMessage} message={message}/>}
      <section className="relative sm:my-8 p-4 mx-auto w-full max-w-2xl sm:rounded sm:drop-shadow bg-white">
        {post &&
          <>
            <div className="flex gap-8 mb-4 w-full border-b border-b-black pb-4">
              <div className="flex-1">
                <h1  data-testid="cypress-h1" className="postTitle text-2xl font-jost font-bold text-slate-800">{post.title}</h1>
                <p className="text-xs mt-2">
                  <span className="postDate">{dayjs(post.createdAt).format('MM/DD/YYYY h:mm A')}</span> &bull; By <span className="postAuthor font-bold">{post.profileId}</span>
                </p>
              </div>
              { post.profileId === user.username &&
                <div className="flex flex-none gap-2 relative">
                  <button className="rounded-full text-white w-8 h-8 p-1 bg-green-700 hover:bg-black" onClick={() => setEditor(true)} title="edit"><PencilIcon className="w-6 h-6"/></button>
                  <button className="rounded-full text-white w-8 h-8 p-1 bg-red-700 hover:bg-black" onClick={() => setDeleteConfirm(true)} title="delete"><TrashIcon className="w-6 h-6"/></button>
                </div>
              }
            </div>
            {imageUrl &&
              <img className="postImage rounded float-right w-1/2 h-auto mb-4 ml-4" src={imageUrl} alt={post.title}/>
            }
            {post.body &&
              <div data-testid="cypress-body" className="postBody" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} />  
            }
            <div className="mt-8">      
                <div>
                  <h3 className="font-bebas text-base text-orange-500 font-bold w-full inline-block">{post.comments && post.comments.items.length > 0 ? 'Comments' :'No comments yet'}</h3>
                  <CommentCreateForm 
                    targetPost={post} 
                    user={user} 
                    setStatus={setStatus}
                    setMessage={setMessage}/>
                  { post.comments && post.comments.items.length > 0 &&
                   <CommentList 
                    user={user} 
                    post={post} 
                    comments={post.comments.items}
                    setStatus={setStatus}
                    setMessage={setMessage}/>
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