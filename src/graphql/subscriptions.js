/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onCreateBlog(filter: $filter) {
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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onUpdateBlog(filter: $filter) {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($filter: ModelSubscriptionBlogFilterInput) {
    onDeleteBlog(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateBlogPost = /* GraphQL */ `
  subscription OnCreateBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onCreateBlogPost(filter: $filter) {
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
export const onUpdateBlogPost = /* GraphQL */ `
  subscription OnUpdateBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onUpdateBlogPost(filter: $filter) {
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
export const onDeleteBlogPost = /* GraphQL */ `
  subscription OnDeleteBlogPost($filter: ModelSubscriptionBlogPostFilterInput) {
    onDeleteBlogPost(filter: $filter) {
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
