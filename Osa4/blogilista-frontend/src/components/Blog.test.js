import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
  let likeHandler
  let deleteHandler

  beforeEach(() => {
    likeHandler = jest.fn()
    deleteHandler = jest.fn()

    const blog = {
      title: "abc",
      author: "def",
      url: "ghi",
      user_id: {
        id: "lksdhflkh3l2asdasd",
        username: "jkl",
        name: "mno"
      },
      likes: "pqr"
    }

    const user = {
      id: "sdkhfjksdnf3232sefl",
      username: "stu",
      name: "vwx"
    }

    render(
      <Blog blog={blog} user={user} likeHandler={likeHandler} deleteHandler={deleteHandler} />
    )
  })

  test("Renders title but not other blog info when first rendering blog", async () => {
    expect(screen.getByText("abc")).toBeDefined()
    expect(screen.queryByText("def")).toBeNull()
    expect(screen.queryByText("ghi")).toBeNull()
    expect(screen.queryByText("jkl")).toBeNull()
    expect(screen.queryByText("pqr")).toBeNull()
  })

  test("Renders all blog info after clicking view button", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("View")

    await user.click(button)

    expect(screen.getByText("abc")).toBeDefined()
    expect(screen.getByText("Author: def")).toBeDefined()
    expect(screen.getByText("ghi")).toBeDefined()
    expect(screen.getByText("Posted by: jkl")).toBeDefined()
    expect(screen.getByText("Likes: pqr")).toBeDefined()
  })

  test("LikeHandler is called twice if like button is clicked twice", async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText("View")
    await user.click(viewButton)

    const likeButton = screen.getByText("Like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})