import React from "react";
import { Link } from 'react-router-dom';

const BlogList = ({blogs, active}) => {

  return (
    <>
      <h3 className="font-bebas text-lg text-red-700 font-bold w-full inline-block pb-1 mb-1 border-b border-b-black">Topics</h3>
      {blogs &&
      <ul>
        {blogs.sort((a, b) => a.name > b.name ? 1 : -1).map((blog) =>          
          <li key={blog.name} className="list-none">
            <Link className={`font-bold font-roboto hover:text-red-700 ${active === blog.blogId ? 'text-red-700' : ''}`} to={'/posts/' + blog.blogId}>
              {blog.name}
            </Link>
          </li>
        )}
      </ul>
      }
    </>
  );
};

export default BlogList;