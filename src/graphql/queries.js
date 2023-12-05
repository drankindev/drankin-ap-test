/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      name
      posts {
        nextToken
        __typename
      }
      blogId
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        blogId
        description
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      comments {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        body
        image
        postId
        profileId
        tags
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      post {
        id
        title
        body
        image
        postId
        profileId
        tags
        createdAt
        updatedAt
        __typename
      }
      content
      profileId
      createdAt
      updatedAt
      postCommentsId
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getBlogPost = /* GraphQL */ `
  query GetBlogPost($id: ID!) {
    getBlogPost(id: $id) {
      id
      blogId
      postId
      blog {
        id
        name
        blogId
        description
        image
        createdAt
        updatedAt
        __typename
      }
      post {
        id
        title
        body
        image
        postId
        profileId
        tags
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBlogPosts = /* GraphQL */ `
  query ListBlogPosts(
    $filter: ModelBlogPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const blogPostsByBlogId = /* GraphQL */ `
  query BlogPostsByBlogId(
    $blogId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBlogPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    blogPostsByBlogId(
      blogId: $blogId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const blogPostsByPostId = /* GraphQL */ `
  query BlogPostsByPostId(
    $postId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBlogPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    blogPostsByPostId(
      postId: $postId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
