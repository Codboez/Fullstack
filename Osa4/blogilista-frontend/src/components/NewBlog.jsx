const NewBlog = ({ onBlogCreation, onCreateCancel, onCreateActivation, hidden }) => {
  if (hidden) {
    return (
      <div className="NewBlog">
        <button onClick={() => {onCreateActivation(true)}}>Add new blog</button>
      </div>
    )
  }

  return (
    <div className="NewBlog">
      <h2>Create a new blog</h2>
      <form onSubmit={ onBlogCreation }>
        <p>Title</p>
        <input required={true} placeholder="Enter title" id="title-input"></input>
        <p>Author</p>
        <input required={true} placeholder="Enter author" id="author-input"></input>
        <p>URL</p>
        <input required={true} placeholder="Enter URL" id="url-input"></input>
        <button type="submit" id="create-blog-button">Create</button>
      </form>
      <button onClick={ onCreateCancel }>Cancel</button>
    </div>
  )
}

export default NewBlog