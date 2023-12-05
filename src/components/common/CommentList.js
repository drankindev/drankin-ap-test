import React from 'react';
import dayjs from 'dayjs';
import { deleteComment } from '../../graphql/mutations';
import { generateClient } from "aws-amplify/api";

const client = generateClient()

const CommentList = ({ comments, user, onSuccess, sortBy = 'createdAt' }) => {
    
    async function confirmDeleteComment(id){
        try {
            await client.graphql({
                query: deleteComment,
                variables: {
                    input: {
                        id: id
                    }
                }
            });
            onSuccess()
        } catch (err) {
            console.log(err);
        }
    }

  return (    
    <ul>         
    {comments && comments.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1).map((comment) => {
        return(
            <li key={comment.id} className="list-none py-1 border-b border-b-gray-300">
                <p className="text-xs mb-1">
                    <b>{comment.profileId}</b> &bull;
                    <i>{dayjs(comment.createdAt).hour(12).format('MM/DD/YYYY HH:mm:ss')}</i> 
                    {user.username === comment.profileId &&
                        <button className="mx-2 text-red-700 hover:text-black" onClick={(e) => confirmDeleteComment(comment.id)}>Delete</button>
                    }
                </p>
                <p className="text-sm mb-1">
                    {comment.content}
                </p>
            </li>
        )
    })}
    </ul>
  )
}

export default CommentList;