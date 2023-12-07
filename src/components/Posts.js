import React, { useState, useEffect } from 'react';
import { fetchBlogList, fetchPostList } from './common/utils';
import PostList from './common/PostList';
import BlogList from './common/BlogList';
import ToggleMenu from './common/ToggleMenu';
import StatusDisplay from './common/StatusDisplay.js';
import { useParams } from 'react-router-dom';
import PostUpdateForm from './form/PostUpdateForm.jsx';
import { TextField } from "@aws-amplify/ui-react";
import { PlusIcon } from '@heroicons/react/24/outline';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Posts = ({user}) => {

    const { blogId } = useParams();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState({blogId:'',keyword:'',date:''});
    const [topic, setTopic] = useState({name: '', title:'', description:''})
    const [keyword,setKeyword] = useState('');
    const [date,setDate] = useState();
    const [editor,setEditor] = useState(false);
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    // on init fetch blogs
    useEffect(() => {
      fetchBlogList({onSuccess: setBlogs});
    }, []);

    // fetch posts on refresh
    useEffect(() => {
      fetchPostList({onSuccess: setPosts, status: status});
      setStatus('idle');
    }, [status]);
    
    // set topic and reset filter when blog updates
    useEffect(() => {
      const findBlog = blogs.find(blog => blog.blogId === blogId);
      if( findBlog ){
        setTopic(findBlog);
      } else {
        setTopic({blogId: '', name:'Recent posts', description:'Check out the latest posts about New York City'});       
      }
      setKeyword('');
      setDate('');
    }, [blogId,blogs]);

    // set filter when topic, keyword, or date change
    useEffect(() => {
      setFilter({
        blogId: topic.blogId,
        keyword: keyword,
        date: date,
      })
    }, [topic,keyword,date]);

    // filter posts when filter updates
    useEffect(() => {
        let tmpPosts = posts.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
        // filter by blog
        tmpPosts = (filter.blogId === '') ? tmpPosts : tmpPosts.filter(post => post.tags !== null && post.tags.includes(filter.blogId));
        
        // filter by keyword
        if (tmpPosts.length > 0 && filter.keyword !== '') {
          tmpPosts = tmpPosts.filter(post => {
            return (post.title.toLowerCase().includes(filter.keyword) || post.body.toLowerCase().includes(filter.keyword))
          });
        }
        // filter by date
        if (tmpPosts.length > 0 && filter.date) {
          const isoDate = filter.date.toISOString().substring(0,10);
          tmpPosts = tmpPosts.filter(post => {
            const postDate = post.createdAt.substring(0,10);
            return (postDate === isoDate);
          });
        }
        setFilteredPosts(tmpPosts);
    }, [filter, posts]);

    // reset filter function
    const resetFilter = () =>{
      setKeyword('');
      setDate('');
    }

    return (
        <>
          {editor && <PostUpdateForm username={user.username} blogList={blogs} setEditor={setEditor} setStatus={setStatus} setMessage={setMessage}/> }
          {message && <StatusDisplay setStatus={setStatus} setMessage={setMessage} message={message}/>}
          <section className="sm:flex flex-auto gap-4 sm:m-4">
            <div className="z-10 w-full sm:w-60 text-center">
              <ToggleMenu title="Topics">
                <BlogList blogs={blogs} active={topic.blogId}/>
              </ToggleMenu>  
              <ToggleMenu title="Search">
                <TextField
                    label="Keyword"
                    value={keyword}
                    size={'small'}
                    onChange={(e) => {
                        const {value} = e.target;
                        setKeyword(value.toString().toLowerCase().trim().replace(/[^A-Za-z0-9 ]/g, ''))
                    }}
                ></TextField>

                <div className="w-full mb-2">
                  <DatePicker 
                    selected={date} 
                    customInput={<TextField padding="10px 0 0 0" label="Date" size="small" value={date}/>}
                    onChange={(e) => setDate(e)} />
                </div>
                {(keyword || date) && <button onClick={(e) => resetFilter()} className="text-right text-orage-500 hover:text-black text-sm">Reset</button>}
              </ToggleMenu>
            </div>            
            <div className="flex flex-col z-0 relative bg-white sm:rounded sm:drop-shadow p-4 h-auto mx-auto max-w-4xl w-full">
              <div className="flex-none flex gap-8 border-b border-b-black pb-3">
                <div className="flex-1">
                  <h1 className="font-bebas text-xl text-orange-500 font-bold w-full inline-block">{topic.name}</h1>
                  <p className="">{topic.description}</p>
                </div>
                <div className="flex flex-none fixed bottom-4 right-4 sm:static">
                    <button className="rounded-full text-white w-10 h-10 p-2 bg-green-700 hover:bg-black" onClick={() => setEditor(true)} title="Create Post"><PlusIcon className="w-6 h-6"/></button>
                </div>
              </div>
              <PostList posts={filteredPosts}/>
            </div>   
          </section>
        </>
    )
}

export default Posts;