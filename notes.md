# Create Layout Component (Layout.js)

We need to make a layout for our project to apply it on all website pages. So, we create **Components** folder and add `Layout.js` file to it.

Inside `Layout.js` we make `Layout function` and export it as default.

Inside `Layout function`, we add `<Head>` (it contains an info like a title of page). We add `<header>` to control the html elements that will appear in the top of pages and we add `props.title` to receive different title depend on the page, also we add `<main>` to control the html elements that will appear in the body of pages, also we add `<footer>` to control the html elements that will appear in the bottom of pages.

## CSS notes

**`<div className="flex min-h-screen flex-col justify-between">`**

In the div that wrap all layout, `min-h-screen` is used to make the page full height.

We used `flex flex-col` to divide the page into three main components vertically and use `justify-between` to create a space between that components.

**`<nav className="flex h-12 items-center px-4 justify-between shadow-md">`**

We used `flex` to divide the navbar components horizontally and use `justify-between` to create a space between that components.

We used `h-12` to identify the height of navbar.

We used `items-center` to align the items in the center (Vertically).

We used padding `px-4` to make a space between left and right of page.

**`<main className="container m-auto mt-4 px-4">`**

The `container` is a class from tailwind to set the maximum width in different screen responsive.

We set the margin property to auto by `m-auto` to horizontally center the element within its container.

**`<footer className="flex h-10 justify-center items-center shadow-inner">`**

The `items-center` is used to center elements vertically.

The `justify-center` is used to center elements horizontally.
