import React, { useState, useEffect } from 'react';
import { fetchBlogList, fetchPostList } from './common/utils';
import PostList from './common/PostList';
import BlogList from './common/BlogList';
import { useParams } from 'react-router-dom';
import PostUpdateForm from './form/PostUpdateForm.jsx';
import { TextField } from "@aws-amplify/ui-react";

const Posts = ({user}) => {

    const { blogId } = useParams();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState({blogId:'',keyword:''});
    const [topic, setTopic] = useState({name: '', title:'', description:''})
    const [editor,setEditor] = useState(false);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
      fetchBlogList({onSuccess: setBlogs});
    }, []);

    useEffect(() => {
      fetchPostList({onSuccess: setPosts});
      setStatus('idle');
    }, [status]);
    
    useEffect(() => {

      const findBlog = blogs.find(blog => blog.blogId === blogId);

      if( findBlog ){
        setTopic(findBlog);
        setFilter({blogId:findBlog.blogId,keyword:''})
      } else {
        setTopic({blogId: '', name:'Recent posts', description:'Check out the latest posts'});       
        setFilter({blogId:'', keyword:''})
      }
    }, [blogId,blogs]);

    useEffect(() => {
        let tmpPosts = posts;
        tmpPosts = (filter.blogId === '') ? tmpPosts : tmpPosts.filter(post => post.tags !== null && post.tags.includes(filter.blogId));
        if (filter.keyword !== '') {
          tmpPosts = tmpPosts.filter(post => {
            return (post.title.toLowerCase().includes(filter.keyword) || post.body.toLowerCase().includes(filter.keyword))
          });
        }
        setFilteredPosts(tmpPosts);
    }, [filter, posts]);

    return (
        <>
          {editor && <PostUpdateForm username={user.username} blogList={blogs} setEditor={setEditor} setStatus={setStatus}/> }
          <section className="flex flex-auto gap-4 m-4">
            <div className="w-60 text-center">
              <nav className="rounded p-4 mb-4 bg-white drop-shadow text-left">
                <BlogList blogs={blogs} active={topic.blogId}/>
              </nav>
              <div className="rounded p-4 mb-4 bg-white drop-shadow text-left">
              <TextField
                  label="Keyword"
                  onChange={(e) => {
                      const {value} = e.target;
                      setFilter({
                        ...filter, 
                        keyword: value.toString().toLowerCase().trim().replace(/[^A-Za-z0-9 ]/g, '')
                      })
                  }}
              ></TextField>
              </div>
            </div>            
            <div className="relative rounded bg-white drop-shadow p-4 mx-auto max-w-4xl w-full">
              <button className="absolute right-4 top-4 block font-bold px-4 py-2 mx-auto text-white bg-red-700 hover:bg-black rounded drop-shadow" onClick={() => setEditor(true)} title="Create Post">Create Post</button>
              <h1 className="font-bebas text-xl text-red-700 font-bold w-full inline-block">{topic.name}</h1>
              <p className="border-b border-b-black pb-3">{topic.description}</p>
              <PostList posts={filteredPosts}/>
            </div>   
          </section>
        </>
    )
}

export default Posts;