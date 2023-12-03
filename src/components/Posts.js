import React, { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { listPosts, listBlogs } from '../graphql/queries';
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

    useEffect(() => {
      fetchBlogList();
    }, []);
    
    useEffect(() => {
      const findBlog = blogs.find(blog => blog.blogId === blogId);

      if( findBlog ){
        setTopic(findBlog);
        fetchPostList({ blogPostsId: {eq: findBlog.id} });
      } else {
        setTopic({blogId: '', name:'Recent posts', description:'Check out the latest posts'});       
        fetchPostList();
      }
    }, [blogId,blogs]);

    async function fetchPostList(filter) {
      const apiData = await client.graphql({ 
        query: listPosts
      });
      const PostsFromAPI = apiData.data.listPosts.items;
      console.log(PostsFromAPI)
      setPosts(PostsFromAPI);
    }
    
    async function fetchBlogList() {
      const apiData = await client.graphql({ query: listBlogs });
      const BlogsFromAPI = apiData.data.listBlogs.items;
      setBlogs(BlogsFromAPI);
    }

    return (
        <>
          {editor && <PostUpdateForm username={user.username} setEditor={setEditor} onSuccess={(e) => {fetchPostList()}}/> }
          <section className="fixed z-40 flex-initial w-44 m-8 text-center">
            <nav className="mb-8 rounded p-4 bg-white drop-shadow text-left">
              <BlogList blogs={blogs} active={topic.blogId}/>
            </nav>
            <button className="block font-bold px-4 py-2 mx-auto text-white bg-red-700 hover:bg-black rounded drop-shadow" onClick={() => setEditor(true)} title="Create Post">Create Post</button>
          </section>
          <section className="my-8 pl-56 mx-auto w-auto max-w-6xl w-3/4">
            <h1 className="font-bebas text-xl text-red-700 font-bold w-full inline-block">{topic.name}</h1>
            <p className="w-full border-b border-b-black mb-4 pb-3">{topic.description}</p>
            <PostList posts={posts}/>
          </section>       
        </>
    )
}

export default Posts;