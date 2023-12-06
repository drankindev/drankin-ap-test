import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const PostList = ({ posts, sortBy = 'createdAt' }) => {
  return (                 
    posts.length > 0 ? 
      <ul>
        {posts.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1).map((post) => {
          return(<li key={post.id} className="list-none py-1 border-b border-b-gray-300">
              <Link className="font-bold font-roboto hover:text-red-700" to={`/post/${post.id}`}>
              {post.title}
              </Link>
              <p className="text-xs"><i>{dayjs(post.createdAt).format('MM/DD/YYYY')}</i> &bull; <b>{post.profileId}</b></p>
          </li>)
        })}
      </ul>
    :
      <p className="mt-4">No Results</p> 
  )
}

export default PostList;