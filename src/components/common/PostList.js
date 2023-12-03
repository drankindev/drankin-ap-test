import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const PostList = ({ posts, sortBy = 'createdAt' }) => {
  return (    
    <ul>         
    {posts.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1).map((post) => {
        let path = '/post/' + (post.postId ? post.postId : post.id);
        return(<li key={post.id} className="list-none">
            <Link className={`font-bold font-roboto hover:text-red-700`} to={path}>
            {post.title}
            </Link>
            <p><i>{dayjs(post.createdAt).format('MM/DD/YYY')}</i></p>
        </li>)
    })}
    </ul>
  )
}

export default PostList;