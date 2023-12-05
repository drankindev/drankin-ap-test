import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const PostList = ({ posts, sortBy = 'createdAt' }) => {
  return (    
    <ul>         
    {posts.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1).map((post) => {
        return(<li key={post.id} className="list-none py-1 border-b border-b-gray-300">
            <Link className="font-bold font-roboto hover:text-red-700" to={`/post/${post.id}`}>
            {post.title}
            </Link>
            <p className="text-xs"><i>{dayjs(post.createdAt.substring(0, 10)).format('MM-DD-YYYY')}</i> &bull; {post.profileId}</p>
        </li>)
    })}
    </ul>
  )
}

export default PostList;