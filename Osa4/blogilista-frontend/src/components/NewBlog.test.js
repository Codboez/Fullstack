import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NewBlog from "./NewBlog"

describe("<NewBlog />", () => {
  let blogCreationHandler
  let creationCancelHandler
  let createActivationHandler
  let user

  beforeEach(() => {
    blogCreationHandler = jest.fn()
    creationCancelHandler = jest.fn()
    createActivationHandler = jest.fn()

    render(
      <NewBlog
        onBlogCreation={event => {
          event.preventDefault()
          blogCreationHandler(event)
        }}
        onCreateCancel={creationCancelHandler}
        onCreateActivation={createActivationHandler}
        hidden={false}
      />
    )

    user = userEvent.setup()
  })

  test("Blog creation handler is called with correct blog info", async () => {
    const titleInput = screen.getByPlaceholderText("Enter title")
    const authorInput = screen.getByPlaceholderText("Enter author")
    const urlInput = screen.getByPlaceholderText("Enter URL")
    const button = screen.getByText("Create")

    await user.type(titleInput, "abc")
    await user.type(authorInput, "def")
    await user.type(urlInput, "ghi")

    await user.click(button)

    expect(blogCreationHandler.mock.calls[0][0].target.elements[0].value).toBe("abc")
    expect(blogCreationHandler.mock.calls[0][0].target.elements[1].value).toBe("def")
    expect(blogCreationHandler.mock.calls[0][0].target.elements[2].value).toBe("ghi")
  })
})