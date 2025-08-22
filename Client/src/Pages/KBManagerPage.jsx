import React, { useEffect, useState } from "react";
import axios from "axios";
import API_PATHS from "../Utils/apiPath";

const KBManagerPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state for create/edit
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [editingId, setEditingId] = useState(null);

  // Fetch all articles on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_PATHS.KB.CREATE);
      setArticles(res.data);
    } catch (err) {
      setError("Failed to fetch articles.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    setTags("");
    setStatus("draft");
    setEditingId(null);
  };

  // Handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);

      if (editingId) {
        // Update existing article
        await axios.put(API_PATHS.KB.UPDATE(editingId), {
          title,
          body,
          tags: tagsArray,
          status,
          updatedAt: new Date(),
        });
      } else {
        // Create new article
        await axios.post(API_PATHS.KB.CREATE, {
          title,
          body,
          tags: tagsArray,
          status,
          updatedAt: new Date(),
        });
      }
      resetForm();
      fetchArticles();
    } catch (err) {
      setError("Failed to save article.");
    }
  };

  const handleEdit = (article) => {
    setTitle(article.title);
    setBody(article.body);
    setTags(article.tags.join(", "));
    setStatus(article.status);
    setEditingId(article._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    setError(null);
    try {
      await axios.delete(API_PATHS.KB.DELETE(id));
      if (editingId === id) resetForm();
      fetchArticles();
    } catch (err) {
      setError("Failed to delete article.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Knowledge Base Manager</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-2">
          <label className="block font-semibold mb-1">Title</label>
          <input
            className="w-full border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold mb-1">Body</label>
          <textarea
            className="w-full border p-2"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold mb-1">Tags (comma-separated)</label>
          <input
            className="w-full border p-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Status</label>
          <select
            className="w-full border p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Article" : "Create Article"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 px-4 py-2 border rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Loading/Error */}
      {loading && <p>Loading articles...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Article list */}
      {!loading && articles.length === 0 && <p>No articles found.</p>}
      <ul>
        {articles.map((article) => (
          <li
            key={article._id}
            className="border p-4 mb-2 rounded flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold">{article.title}</h3>
              <p>Status: {article.status}</p>
              <p>Tags: {article.tags.join(", ")}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(article)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(article._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KBManagerPage;
