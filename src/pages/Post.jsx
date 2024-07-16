import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="max-w-6xl mx-auto my-2 p-4 relative">
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-bold text-2xl mb-6 text-zinc-100 bg-gradient-to-r from-zinc-600 to-zinc-800"
          >
             Back to Posts
          </Button>
          <div className="max-w-6xl mb-6 mx-auto px-4">
            <h1 className="text-5xl font-extrabold text-indigo-950 flex justify-start">
              {post.title}
            </h1>
          </div>
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-md w-full object-center object-cover mb-4 shadow-xl shadow-black"
            style={{ height: "700px" }}
          />

          {isAuthor && (
            <div className="absolute right-10 top-24">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="browser-css max-w-6xl mx-auto px-4 text-left font-semibold text-2xl  text-indigo-900">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
