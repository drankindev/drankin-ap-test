import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { fetchBlogList, fetchPostList, fetchBlogPosts } from './common/utils';
import PostList from './common/PostList';
import BlogList from './common/BlogList';
import { useParams, Link } from 'react-router-dom';
import PostUpdateForm from './form/PostUpdateForm.jsx';
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const client = generateClient();

const Posts = ({user}) => {

    const { blogId } = useParams();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState({});
    const [topic, setTopic] = useState({name: '', title:'', description:''})
    const [editor,setEditor] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
      fetchBlogList({onSuccess: setBlogs});
    }, []);
    
    useEffect(() => {

      const findBlog = blogs.find(blog => blog.blogId === blogId);

      if( findBlog ){
        setTopic(findBlog);
        fetchBlogPosts({onSuccess: setPosts, blogId: findBlog.id});
      } else {
        setTopic({blogId: '', name:'Recent posts', description:'Check out the latest posts'});       
        fetchPostList({onSuccess: setPosts});
      }
    }, [blogId,blogs]);

    return (
        <>
          {editor && <PostUpdateForm username={user.username} blogList={blogs} setEditor={setEditor} onSuccess={(e) => {fetchPostList()}}/> }
          <section className="flex flex-auto gap-4 m-4">
            <div className="w-60 text-center">
              <nav className="rounded p-4 mb-4 bg-white drop-shadow text-left">
                <BlogList blogs={blogs} active={topic.blogId}/>
              </nav>
              <button className="block font-bold px-4 py-2 mx-auto text-white bg-red-700 hover:bg-black rounded drop-shadow" onClick={() => setEditor(true)} title="Create Post">Create Post</button>
            </div>            
            <div className="rounded bg-white drop-shadow p-4 mx-auto max-w-4xl w-full">
              <h1 className="font-bebas text-xl text-red-700 font-bold w-full inline-block">{topic.name}</h1>
              <p className="border-b border-b-black pb-3">{topic.description}</p>
              <PostList posts={posts}/>
            </div>   
          </section>
        </>
    )
}

export default Posts;