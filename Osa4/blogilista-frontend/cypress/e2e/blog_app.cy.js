describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/api/testing/reset`)

    const user = {
      username: "abcd",
      name: "aaaa",
      password: "Abcd1234"
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, user)

    cy.visit("")
  })

  it("Login form is shown", function() {
    cy.contains("Username")
  })

  describe("Login",function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username-input").type("abcd")
      cy.get("#password-input").type("Abcd1234")
      cy.get("#login-button").click()
      cy.contains("Blogs")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username-input").type("abcd")
      cy.get("#password-input").type("Abc123")
      cy.get("#login-button").click()
      cy.contains("Could not login")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      const user = {
        username: "abcd",
        password: "Abcd1234"
      }
      cy.request("POST", `${Cypress.env("BACKEND")}/api/login`, user)
        .then(response => {
          localStorage.setItem("blogAppUser", JSON.stringify(response.body))
          cy.visit("")
        })
    })

    it("A blog can be created", function() {
      cy.contains("Add new blog").click()
      cy.get("#title-input").type("aaa")
      cy.get("#author-input").type("bbb")
      cy.get("#url-input").type("ccc")
      cy.get("#create-blog-button").click()

      cy.contains("Blog added successfully")
      cy.contains("aaa")
    })

    describe("When a blog has been added", function() {
      beforeEach(function() {
        const blog = {
          title: "aaa",
          author: "bbb",
          url: "ccc"
        }
        cy.request({
          url: `${Cypress.env("BACKEND")}/api/blogs`,
          method: "POST",
          headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("blogAppUser")).token
          },
          body: blog
        })

        cy.visit("")
      })

      it("A blog can be liked", function() {
        cy.contains("View").click()
        cy.contains("Like").click()
        cy.contains("Likes: 1")
      })

      it("A blog can be deleted", function() {
        cy.contains("View").click()
        cy.contains("Delete").click()
        cy.contains("Blog deleted successfully")
        cy.contains("aaa").should("not.exist")
      })

      it("A blog can not be deleted by others", function() {
        cy.contains("Logout").click()

        const user = {
          username: "abcde",
          name: "aaaaa",
          password: "Abcde12345"
        }
        cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, user)

        cy.visit("")

        const credentials = {
          username: "abcde",
          password: "Abcde12345"
        }
        cy.request("POST", `${Cypress.env("BACKEND")}/api/login`, credentials)
          .then(response => {
            localStorage.setItem("blogAppUser", JSON.stringify(response.body))
            cy.visit("")
          })

        cy.contains("View").click()
        cy.contains("Delete").should("not.exist")
      })

      it("Blogs are sorted by likes", function() {
        const blog = {
          title: "123",
          author: "456",
          url: "789"
        }
        cy.request({
          url: `${Cypress.env("BACKEND")}/api/blogs`,
          method: "POST",
          headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("blogAppUser")).token
          },
          body: blog
        })

        cy.visit("")

        cy.get(".Blog").eq(0).should("contain", "aaa")

        cy.contains("123").parent().find("button").click()
        cy.contains("123").parent().contains("Likes: 0").find("button").click()

        cy.visit("")

        cy.get(".Blog").eq(0).should("contain", "123")
      })
    })
  })
})