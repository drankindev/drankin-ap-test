import { generateClient } from "aws-amplify/api";
import { listPosts, listBlogs } from '../../graphql/queries';
import { getUrl, list } from 'aws-amplify/storage';
import { Cache } from 'aws-amplify/utils';
import dayjs from 'dayjs';

const client = generateClient();

export const fetchBlogList = async ({onSuccess}) => {

    // get blogs from cache
    let BlogsFromCache = await Cache.getItem('blogs');
    if (BlogsFromCache !== null && BlogsFromCache.length > 0) {
      // return cached blogs
      onSuccess(BlogsFromCache);
    } else {
      try {
        // get blogs from api if not cached
        const apiData = await client.graphql({ query: listBlogs });
        const BlogsFromAPI = apiData.data.listBlogs.items ?? [];

        // cache blogs for 1 week
        const expiration = dayjs(new Date()).add(7, 'd');
        Cache.setItem('blogs', BlogsFromAPI, { expires: expiration.valueOf() });
        
        // return api blogs
        onSuccess(BlogsFromAPI);
      } catch (err) {
          console.log(err);
      }
    }
}

export const fetchPostList = async ({onSuccess, status}) => {
  // get posts from cache
  let PostsFromCache = await Cache.getItem('posts');
  if (PostsFromCache !== null  && status !== 'refresh' && PostsFromCache.length > 0) {
    // return cached posts
    onSuccess(PostsFromCache);
  } else {
    try {
      const apiData = await client.graphql({ 
        query: listPosts
      });
      const PostsFromAPI = apiData.data.listPosts.items;

      // cache posts for 10 minutes
      const expiration = dayjs(new Date()).add(10, 'm');
      Cache.setItem('posts', PostsFromAPI, { expires: expiration.valueOf() });
      
      // return posts from api
      onSuccess(PostsFromAPI);
    } catch (err) {
      console.log(err);
    }
  }
}

export const fetchPost = async ({postId, onSuccess, status}) => {
  // get post from cache
  let PostFromCache = await Cache.getItem(postId);
  if (PostFromCache !== null && status !== 'refresh') {
    // return cached post
    onSuccess(PostFromCache);
  } else {
    try {
      const apiData = await client.graphql({ 
        query: getPost,
        variables: { id: postId }
      });
      const PostFromAPI = apiData.data.getPost;

      // cache post for 1 day
      const expiration = dayjs(new Date()).add(1, 'd');
      Cache.setItem(postId, PostFromAPI, { expires: expiration.valueOf() });

      // return post from api
      onSuccess(PostFromAPI);
    } catch (err) {
      console.log(err);
    }
  }
}

export const validateImage = async ({onSuccess,filename}) => {
  try {
    const validUrl = await list({
      prefix: filename
    });
    if (validUrl.items.length > 0) {
      const res = await getUrl({
        key: filename,
        options: {
          accessLevel: 'public',
        }
      });
      if (onSuccess && res.url) {
        onSuccess(res.url.toString());
      }
    }
  } catch (err) {
    console.log('error',err);
  }
}
  
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      comments {
        items {
          id
          content
          profileId
          createdAt
          updatedAt
          postCommentsId
          __typename
        }
        nextToken
        __typename
      }
      body
      image
      postId
      profileId
      blogs {
        nextToken
        __typename
      }
      tags
      createdAt
      updatedAt
      __typename
    }
  }
`;
  export const getPostByPostId = /* GraphQL */ `
  query GetPostByPostId($postId: ID!) {
    getPostByPostId(postId: $postId) {
      id
      title
      comments {
        items {
          id
          content
          profileId
          createdAt
          updatedAt
          postCommentsId
          __typename
        }
        nextToken
        __typename
      }
      body
      image
      postId
      profileId
      blogs {
        items {
          id
          blogId
          postId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
