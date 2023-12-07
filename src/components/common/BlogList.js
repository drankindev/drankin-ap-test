import React from "react";
import { Link } from 'react-router-dom';

const BlogList = ({blogs, active}) => {

  return (
    <>
      {blogs.length > 0 &&
      <ul>
        {blogs.sort((a, b) => a.name > b.name ? 1 : -1).map((blog) =>          
          <li key={blog.name} className="list-none">
            <Link className={`font-bold font-jost hover:text-red-700 ${active === blog.blogId ? 'text-red-700' : ''}`} to={'/posts/' + blog.blogId}>
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