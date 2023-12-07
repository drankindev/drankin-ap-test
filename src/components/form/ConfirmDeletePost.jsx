import { generateClient } from "aws-amplify/api";
import { deletePost } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { Cache } from 'aws-amplify/utils';

const client = generateClient()

const ConfirmDeletePost = ({post, setDeleteConfirm}) => {
    const navigate = useNavigate();
    async function confirmDelete(){
        await client.graphql({
            query: deletePost,
            variables: {
                input: {
                    id: post.id
                }
            }
        });
        Cache.removeItem('posts');
        Cache.removeItem(post.id);
        navigate('/posts');
    }

    return(
        <div className="fixed w-full h-full z-50 bg-black bg-opacity-80 top-0 left-0 p-8 overflow-y-scroll">
            <div className=" relative w-full max-w-xl mx-auto p-4 bg-white rounded" >
                <h3 className="font-bebas text-lg text-orange-500 font-bold w-full inline-block pb-1 mb-1 border-b border-b-black">Delete this post?</h3>
                <p>{post.title}</p>
                <div className="flex gap-4 mt-8 w-4/5 mx-auto">
                    <button  
                        className="flex-1 text-white bg-gray-400 hover:bg-black rounded font-bold py-1 px-2" 
                        onClick={(e) => {setDeleteConfirm(false)}}
                    >Cancel</button>
                    <button className="flex-1 text-white bg-red-700 hover:bg-black rounded font-bold py-1 px-2" onClick={(e) => {
                        
                        confirmDelete();
                    }}>Delete</button>
                </div>

            </div>
        </div>
    )
}

export default ConfirmDeletePost;