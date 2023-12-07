import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pagination } from '@aws-amplify/ui-react';

const PostList = ({ posts, sortBy = 'createdAt' }) => {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(1);
  const [paginatedPosts, setPaginatedPosts] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const perPage = 10;

  React.useEffect(() => {
    const start = (currentPageIndex -1) * perPage;
    const tmpPosts = posts.slice(start, start + perPage);
    const total = Math.ceil(posts.length/perPage)

    setTotalPages(total);
    setPaginatedPosts(tmpPosts);
  }, [posts,currentPageIndex]);

  const handleNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleOnChange = (newPageIndex) => {
    console.log(newPageIndex)
    setCurrentPageIndex(newPageIndex);
  };

  return (                 
    paginatedPosts.length > 0 ? 
      <div className="flex flex-col flex-1">
        <ul className="flex-1">
          {paginatedPosts.map((post) => {
            return(<li key={post.id} className="list-none py-1 border-b border-b-gray-300">
                <Link className="font-bold font-jost hover:text-red-700" to={`/post/${post.id}`}>
                {post.title}
                </Link>
                <p className="text-xs mb-1"><i>{dayjs(post.createdAt).format('MM/DD/YYYY')}</i> &bull; <b>{post.profileId}</b></p>
            </li>)
          })}
        </ul>
        {totalPages > 1 &&
          <div className="flex-none pt-4">
            <Pagination
              currentPage={currentPageIndex}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              onChange={handleOnChange}
            />  
          </div>
        }
      </div>
    : <p className="mt-4">No Results</p> 
  )
}

export default PostList;