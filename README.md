# MyReads Project

Based on the provided starter template. No modifications have been done to the CSS or assets. The JS/JSX code is all new.

## Installation and running

* install all project dependencies with `npm install`
* start the development server with `npm start`
* build prod version with `npm run build`

## What this app is doing

This is a simple book management app.

### Main view

The app presents a list of books divided into three shelves, Want to Read, Read and Currently Reading. The data is fetched from server, so you should be getting consistent results between runs. To move a book to another shelf, press the green down arrow and select a new shelf. To remove the book completly, select "none".

### Search view

You can also add new books. Press the Plus button in the bottom right corner. It will show a new view, where you can enter a search term and you will get matching results from the server. You can then place the books on your shelf by using the same green arrow. To go back to the main view, use the back arrow in the top left.

### Goinbg beyond

On top of the requirements in the rubric the following have been added:
1. Tooltips showing the book description, if available, when hovering over a book.
2. Use of React context API to avoid passing static data deep down the hierarchy. The static list of book shelves is passed this way.
3. Debouncing of user input in the search view.

## What You're Getting
```bash
├── .prettierrc.yaml # Config file for formatting the source code as close to Udacity requirements as possible.
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. New dependencies have been added, namely lodash and react-router-dom.
├── public
│   ├── favicon.ico # React Icon,
│   └── index.html # unmodified
└── src
    ├── App.css # Styles for the app. The book class has relative positioning now, to allow better tooltip alignment.
    ├── App.js # This is the root of the app. The main component is here, along with the route switcher.
    ├── Book.js # Component representing a single book in the grid.
    ├── BookGrid.js # Component representing a grid of books, either on shelf or in book results.
    ├── BookList.js # The main view of the app, with 3 shelves.
    ├── BookShelf.js # Component rendering one shelf inside the maion view.
    ├── BookShelfChanger.js # Component rendering the selector control for moving a book between shelves.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── SearchView.js # The only other stateful component, containing the serach input and results.
    ├── Tooltip.css # CSS style for the tooltip component
    ├── Tooltip.js # Tooltip component rendering a piece of text when its parent is hovered.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. 
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
