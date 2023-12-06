import React, { useState, useEffect } from 'react';
import { fetchBlogList, fetchPostList } from './common/utils';
import { Cache } from 'aws-amplify/utils';
import PostList from './common/PostList';
import BlogList from './common/BlogList';
import { useParams } from 'react-router-dom';
import PostUpdateForm from './form/PostUpdateForm.jsx';
import { TextField } from "@aws-amplify/ui-react";
import { PencilIcon } from '@heroicons/react/24/outline';
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

    useEffect(() => {
      fetchBlogList({onSuccess: setBlogs});
    }, []);

    useEffect(() => {
      fetchPostList({onSuccess: setPosts, status: status});
      setStatus('idle');
    }, [status]);
    
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

    useEffect(() => {
      setFilter({
        blogId: topic.blogId,
        keyword: keyword,
        date: date,
      })
    }, [topic,keyword,date]);

    useEffect(() => {
        let tmpPosts = posts;
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

    return (
        <>
          {editor && <PostUpdateForm username={user.username} blogList={blogs} setEditor={setEditor} setStatus={setStatus}/> }
          <section className="flex flex-auto gap-4 m-4">
            <div className="z-10 w-60 text-center">
              <nav className="rounded p-4 mb-4 bg-white drop-shadow text-left">
                <BlogList blogs={blogs} active={topic.blogId}/>
              </nav>
              <div className="rounded p-4 mb-4 bg-white drop-shadow text-left">
                <h3 className="font-bebas text-lg text-red-700 font-bold w-full inline-block pb-1 mb-1 border-b border-b-black">Search</h3>
                <TextField
                    label="Keyword"
                    value={keyword}
                    size={'small'}
                    onChange={(e) => {
                        const {value} = e.target;
                        setKeyword(value.toString().toLowerCase().trim().replace(/[^A-Za-z0-9 ]/g, ''))
                    }}
                ></TextField>

                <DatePicker 
                  selected={date} 
                  customInput={<TextField padding="10px 0 0 0" label="Date" size="small" value={date}/>}
                  onChange={(e) => setDate(e)} />

              </div>
            </div>            
            <div className="z-0 relative rounded bg-white drop-shadow p-4 mx-auto max-w-4xl w-full">
              <div className="flex gap-8 border-b border-b-black pb-3">
                <div className="flex-1">
                  <h1 className="font-bebas text-xl text-red-700 font-bold w-full inline-block">{topic.name}</h1>
                  <p className="">{topic.description}</p>
                </div>
                <div className="flex flex-none">
                    <button className="rounded-full text-white w-8 h-8 p-1 bg-green-700 hover:bg-black" onClick={() => setEditor(true)} title="Create Post"><PencilIcon className="w-6 h-6"/></button>
                </div>
              </div>
              <PostList posts={filteredPosts}/>
            </div>   
          </section>
        </>
    )
}

export default Posts;