import React from 'react';

const NotFound = () => {
    return (
        <>
            <section className="relative sm:my-8 p-4 mx-auto w-full max-w-2xl sm:rounded sm:drop-shadow bg-white">
                <div className="flex gap-8 mb-4 w-full border-b border-b-black pb-4">
                    <h1 className="flex-1 font-bebas text-2xl font-roboto font-bold text-red-700">404: Page not found</h1> 
                </div>
            </section> 
        </> 
    )
}

export default NotFound;