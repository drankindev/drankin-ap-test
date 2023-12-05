import { generateClient } from "aws-amplify/api";
import { listPosts, listBlogs, listBlogPosts } from '../../graphql/queries';

const client = generateClient();

export const fetchBlogList = async ({onSuccess}) => {
    try {
        const apiData = await client.graphql({ query: listBlogs });
        const BlogsFromAPI = apiData.data.listBlogs.items ?? [];
        onSuccess(BlogsFromAPI);
    } catch (err) {
        console.log(err);
    }
}

export const fetchPostList = async ({onSuccess, filter}) => {
    try {
      const apiData = await client.graphql({ 
        query: listPosts
      });
      const PostsFromAPI = apiData.data.listPosts.items;
      onSuccess(PostsFromAPI);
    } catch (err) {
      console.log(err);
    }
}

export const fetchBlogPosts = async ({onSuccess, blogId}) => {
    try {
        console.log(blogId)
      const apiData = await client.graphql({
        query: listBlogPosts,
        variables: {
          filter: {blogId: { eq: blogId}}
        }
      });
      const PostsFromAPI = apiData.data.listBlogPosts.items;
      let posts = [];
      PostsFromAPI.map((item) => {
        posts.push(item.post);
      })
      console.log(PostsFromAPI);
      onSuccess(posts);
    } catch (err) {
      console.log(err);
    }
  }


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
