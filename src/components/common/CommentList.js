import React from 'react';
import dayjs from 'dayjs';
import { deleteComment } from '../../graphql/mutations';
import { generateClient } from "aws-amplify/api";
import { TrashIcon } from '@heroicons/react/24/outline';
import DOMPurify from 'dompurify';

const client = generateClient()
const CommentList = ({ comments, user, onSuccess, sortBy = 'createdAt', setStatus, setMessage }) => {
    
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
        setStatus('refresh');
        setMessage('Comment Deleted');
    } catch (err) {
        console.log(err);
    }
}

  return (    
    <ul>         
    {comments && comments.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1).map((comment) => {
        return(
            <li key={comment.id} className="list-none py-1 border-b border-b-slate-300">
                <p className="text-xs mb-1">
                    <b>{comment.profileId}</b> &bull; {dayjs(comment.createdAt).hour(12).format('MM/DD/YYYY h:mm A')}
                    {user.username === comment.profileId &&
                        <button className="mx-2 text-red-700 hover:text-black" onClick={(e) => confirmDeleteComment(comment.id)}>Delete <TrashIcon className="inline w-3 h-3 mb-0.5"/></button>
                    }
                </p>
                <p className="text-sm mb-1">
                    {DOMPurify.sanitize(comment.content, {ALLOWED_TAGS: ['']})}
                </p>
            </li>
        )
    })}
    </ul>
  )
}

export default CommentList;