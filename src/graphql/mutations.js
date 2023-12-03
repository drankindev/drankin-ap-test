/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      name
      posts {
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
      blogId
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      name
      posts {
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
      blogId
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      name
      posts {
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
      blogId
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      post {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      post {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      post {
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
export const createBlogPost = /* GraphQL */ `
  mutation CreateBlogPost(
    $input: CreateBlogPostInput!
    $condition: ModelBlogPostConditionInput
  ) {
    createBlogPost(input: $input, condition: $condition) {
      id
      blogId
      postId
      blog {
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
      post {
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
export const updateBlogPost = /* GraphQL */ `
  mutation UpdateBlogPost(
    $input: UpdateBlogPostInput!
    $condition: ModelBlogPostConditionInput
  ) {
    updateBlogPost(input: $input, condition: $condition) {
      id
      blogId
      postId
      blog {
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
      post {
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
export const deleteBlogPost = /* GraphQL */ `
  mutation DeleteBlogPost(
    $input: DeleteBlogPostInput!
    $condition: ModelBlogPostConditionInput
  ) {
    deleteBlogPost(input: $input, condition: $condition) {
      id
      blogId
      postId
      blog {
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
      post {
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
