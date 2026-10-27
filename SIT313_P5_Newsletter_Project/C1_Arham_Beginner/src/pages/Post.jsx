import { useState } from "react";

function Post() {
  const [postType, setPostType] = useState("question");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");

  function handlePost(event) {
    event.preventDefault();

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (title.trim() === "") {
      alert("Please enter a title.");
      return;
    }

    if (postType === "question" && description.trim() === "") {
      alert("Please describe your problem.");
      return;
    }

    if (postType === "article" && abstract.trim() === "") {
      alert("Please enter an abstract.");
      return;
    }

    if (postType === "article" && articleText.trim() === "") {
      alert("Please enter the article text.");
      return;
    }

    if (tagList.length > 3) {
      alert("Please enter no more than 3 tags.");
      return;
    }

    if (tagList.some((tag) => tag.length > 20)) {
      alert("Each tag must be 20 characters or less.");
      return;
    }

    alert("Your post has been sent successfully!");

    setTitle("");
    setDescription("");
    setAbstract("");
    setArticleText("");
    setTags("");
  }

  return (
    <main className="post-page">
      <form className="post-form" onSubmit={handlePost}>
        <h1 className="post-heading">New Post</h1>

        <div className="post-type-row">
          <span>Select Post Type:</span>
          <label>
            <input
              type="radio"
              name="postType"
              value="question"
              checked={postType === "question"}
              onChange={() => setPostType("question")}
            />
            Question
          </label>
          <label>
            <input
              type="radio"
              name="postType"
              value="article"
              checked={postType === "article"}
              onChange={() => setPostType("article")}
            />
            Article
          </label>
        </div>

        <h2 className="post-section-heading">What do you want to ask or share</h2>
        <p className="post-help">
          This section changes depending on the type of post you select.
          {postType === "question"
            ? " For a question, explain the problem you need help with."
            : " For an article, add a short abstract and the full article text."}
        </p>

        <label className="post-label" htmlFor="post-title">Title</label>
        <input
          id="post-title"
          className="post-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength="100"
          placeholder={
            postType === "question"
              ? "Start your question with how, what, why, etc."
              : "Enter a descriptive title"
          }
        />

        {postType === "question" ? (
          <>
            <label className="post-label" htmlFor="description">Describe your problem</label>
            <textarea
              id="description"
              className="post-textarea question-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength="2000"
              placeholder="Explain your question here"
            />
          </>
        ) : (
          <>
            <label className="post-label" htmlFor="abstract">Abstract</label>
            <textarea
              id="abstract"
              className="post-textarea article-abstract"
              value={abstract}
              onChange={(event) => setAbstract(event.target.value)}
              maxLength="500"
              placeholder="Enter a short abstract"
            />

            <label className="post-label" htmlFor="article-text">Article Text</label>
            <textarea
              id="article-text"
              className="post-textarea article-body"
              value={articleText}
              onChange={(event) => setArticleText(event.target.value)}
              maxLength="5000"
              placeholder="Write your article here"
            />
          </>
        )}

        <label className="post-label" htmlFor="tags">Tags</label>
        <input
          id="tags"
          className="post-input"
          type="text"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="Add up to 3 tags, separated by commas, e.g. Java"
        />
        <p className="tag-note">Use commas between tags. You can add up to 3 tags.</p>

        <div className="post-button-row">
          <button className="post-submit" type="submit">Post</button>
        </div>
      </form>
    </main>
  );
}

export default Post;
