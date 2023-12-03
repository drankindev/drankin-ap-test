exports.handler = async (event) => {
    console.log(event)
    const postId = event.pathParameters.postId;
    const post = {'postId': postId, 'title': "Post " + postId };
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(post),
    };
    return response;
};