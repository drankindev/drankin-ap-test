import { generateClient } from "aws-amplify/api";
import { deletePost } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const client = generateClient()

const ConfirmDeletePost = ({post, setDeleteConfirm, onConfirm}) => {
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
        navigate('/posts');
    }

    return(
        <div className="fixed w-full h-full z-50 bg-black bg-opacity-80 top-0 left-0 p-8 overflow-y-scroll">
            <div className=" relative w-full max-w-xl mx-auto p-4 bg-white rounded" >
                <h3 className="font-bebas text-lg text-red-700 font-bold w-full inline-block pb-1 mb-1 border-b border-b-black">Delete this post?</h3>
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