import axios from "axios";
import env from "dotenv";
env.config();
const API_URL = process.env.API_URL;

const renderMainPage = async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("index.ejs", { posts: response.data });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
}

const renderNewPostPage = (req, res) => {
    res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
}

const renderEditPage = async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`); //this req.params.id is coming from the ejs side. It is the endpoint that the user hits up from the form.
        console.log(response.data);
        res.render("modify.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: response.data,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post" });
    }
}

const createPost = async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}

const updatePost = async (req, res) => {
    console.log("called");
    try {
        const response = await axios.patch(
            `${API_URL}/posts/${req.params.id}`,
            req.body
        );
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
}

const deletePost = async (req, res) => {
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
}

export { renderMainPage, renderNewPostPage, renderEditPage, createPost, updatePost, deletePost };