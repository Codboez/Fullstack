const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((favourite_blog, new_blog) => {
    return new_blog.likes > favourite_blog.likes ? new_blog : favourite_blog
  }, blogs[0])
}

const getHighestValueInDictionary = (dictionary) => {
  let highestValue = 0
  let highestKey = undefined

  for (const [key, value] of Object.entries(dictionary)) {
    if (value > highestValue) {
      highestKey = key
      highestValue = value
    }
  }

  return [highestKey, highestValue]
}

const mostBlogs = (blogs) => {
  let authors = {}

  for (const blog of blogs) {
    if (blog.author in authors){
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }
  }

  const kvp = getHighestValueInDictionary(authors)

  return {
    author: kvp[0],
    blogs: kvp[1]
  }
}

const mostLikes = (blogs) => {
  let authors = {}

  for (const blog of blogs) {
    if (blog.author in authors){
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  }

  const kvp = getHighestValueInDictionary(authors)

  return {
    author: kvp[0],
    likes: kvp[1]
  }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }