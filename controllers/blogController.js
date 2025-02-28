
const getSpecificPost = (req, res) => {
    let postId = parseInt(req.params.id);
    let foundPost = posts.find((post) => post.id === postId);
    res.json(foundPost);
}

const postNewPost = (req, res) => {
    let { title, content, author } = req.body;
    let newId = lastId + 1;
    let newPost = {
        id: newId,
        title: title,
        content: content,
        author: author,
        date: new Date(),
    };
    lastId = newId;
    posts.push(newPost);
    res.status(201).json(newPost);
}

const patchPost = (req, res) => {
    let { title, content, author } = req.body;
    let postId = parseInt(req.params.id);
    let foundPost = posts.find((post) => post.id === postId);
    let newPost = {
        id: postId,
        title: title || foundPost.title,
        content: content || foundPost.content,
        author: author || foundPost.author,
        date: new Date() || foundPost.date,
    };

    let postIndex = posts.findIndex((post) => post.id === postId);
    posts[postIndex] = newPost;

    res.json(newPost);
}

const deletePost = (req, res) => {
    let postId = parseInt(req.params.id);
    let foundPostIndex = posts.findIndex((post) => post.id === postId);
    if (foundPostIndex > -1) {
        posts.splice(foundPostIndex, 1);
    }

    res.sendStatus(200);
}

export { getSpecificPost, postNewPost, patchPost, deletePost };