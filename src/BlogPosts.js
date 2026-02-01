import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogPosts.css";

const BACKEND_URL = "http://localhost:8080";

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPosts = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`${BACKEND_URL}/api/blogs?limit=5`);
            setPosts(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="blog-container">
            <h2 className="blog-title">Latest Posts</h2>
            <button className="refresh-button" onClick={fetchPosts}>
                Refresh
            </button>

            {loading && <p>Loading posts...</p>}
            {error && <p className="error">{error}</p>}

            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        {post.featuredImage && (
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="post-image"
                            />
                        )}
                        <div className="post-content">
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-excerpt">{post.excerpt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPosts;
