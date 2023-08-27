const listHelper = require("../utils/list_helper")

test("dummy returns 1", () => {
  expect(listHelper.dummy([])).toBe(1)
})

describe("total likes", () => {
  test("calculates total likes correctly", () => {
    const blogs = [
      {
        author: "abc",
        title: "aei",
        url: "abc.abc",
        likes: 8
      },
      {
        author: "aaa",
        title: "tgh",
        url: "tgh.aaa",
        likes: 19
      }
    ]

    expect(listHelper.totalLikes(blogs)).toBe(27)
  })

  test("returns 0 when list empty", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe("favourite blog", () => {
  test("Returns blog with most likes", () => {
    const blogs = [
      {
        author: "abc",
        title: "aei",
        url: "abc.abc",
        likes: 8
      },
      {
        author: "aaa",
        title: "tgh",
        url: "tgh.aaa",
        likes: 19
      }
    ]

    expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[1])
  })

  test("Returns undefined when given list is empty", () => {
    expect(listHelper.favouriteBlog([])).toBe(undefined)
  })

  test("Returns either blog when two blogs have equal likes", () => {
    const blogs = [
      {
        author: "abc",
        title: "aei",
        url: "abc.abc",
        likes: 8
      },
      {
        author: "aaa",
        title: "tgh",
        url: "tgh.aaa",
        likes: 8
      }
    ]

    expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[0])
  })
})

describe("most blogs", () => {
  test("Returns author with most blogs", () => {
    const blogs = [
      {
        author: "abc",
        title: "aei",
        url: "abc.abc",
        likes: 8
      },
      {
        author: "aaa",
        title: "tgh",
        url: "tgh.aaa",
        likes: 23
      },
      {
        author: "aaa",
        title: "qwe",
        url: "qwe.aaa",
        likes: 16
      }
    ]

    expect(listHelper.mostBlogs(blogs)).toEqual({ author: "aaa", blogs: 2 })
  })

  test("Returns any author that has the most blogs", () => {
    const blogs = [
      {
        author: "abc",
        title: "aei",
        url: "abc.abc",
        likes: 8
      },
      {
        author: "aaa",
        title: "tgh",
        url: "tgh.aaa",
        likes: 23
      }
    ]

    expect(listHelper.mostBlogs(blogs)).toEqual({ author: "abc", blogs: 1 })
  })

  test("Returns undefined when blog list is empty", () => {
    expect(listHelper.mostBlogs([])).toEqual({ author: undefined, blogs: 0 })
  })
})

describe("most likes", () => {
  test("Returns author with most total likes", () => {
    const blogs = [
      {
        author: "abc",
        title: "aei",
        url: "abc.abc",
        likes: 23
      },
      {
        author: "aaa",
        title: "tgh",
        url: "tgh.aaa",
        likes: 8
      },
      {
        author: "aaa",
        title: "qwe",
        url: "qwe.aaa",
        likes: 16
      }
    ]

    expect(listHelper.mostLikes(blogs)).toEqual({ author: "aaa", likes: 24 })
  })

  test("Returns any author that has the most likes", () => {
    const blogs = [
      {
        author: "abc",
        title: "aei",
        url: "abc.abc",
        likes: 8
      },
      {
        author: "aaa",
        title: "tgh",
        url: "tgh.aaa",
        likes: 8
      }
    ]

    expect(listHelper.mostLikes(blogs)).toEqual({ author: "abc", likes: 8 })
  })

  test("Returns undefined when blog list is empty", () => {
    expect(listHelper.mostLikes([])).toEqual({ author: undefined, likes: 0 })
  })
})