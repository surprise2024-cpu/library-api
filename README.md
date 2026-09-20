# Library API

A RESTful API built with **Express** and **TypeScript** for managing authors and books in a small library system.

The API supports CRUD operations, validation, author-book relationships, searching, filtering, sorting, pagination and centralized error handling.

--- 

## Technologies Used

- Node.js
- TypeScript
- Express
- Postman

---

## Installation

Download Postman if you don't have it already

https://www.postman.com/downloads/


Clone repository:

```bash
git clone https://github.com/surprise2024-cpu/library-api.git
```

Install the project dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The API runs on

```text
http://localhost:4000
```

---

## Author Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/authors` | Create a new author |
| GET | `/authors` | Get all authors |
| GET | `/authors/:ids` | Get an author by ID |
| PUT | `/authors/:id` | Update an author |
| DELETE | `/authors/:id` | Delete author by ID |
| GET | `/authors/:id/books` | Get all books written by an author |

---

## Create Author

```http
POST /authors
```

![Author creation](/src/assets/author-creation.png)

---

## Book Endpoint

| Method | Endpoint | Description |
|---|---|---|
| POST | `/books` | Create a new book |
| GET | `/books` | Get all books |
| GET | `/books/:ids` | Get a book by ID |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book by ID |

---

## Create a Book

```http
POST http://localhost:4000/books
```

![Book creation](/src/assets/book-creation.png)

---

## Get Books by Author

```http
GET http://localhost:4000/authors/1/books
```

![Books by author 1](/src/assets/get-books-written-by-an-author.png)

---

## Search and Filtering

Books can be searched and filtered using quety parameters.

---

Search by title:

```text
GET http://localhost:4000/books?title=hamlet
```

![search by title](/src/assets/search-by-title.png)

---

Search by author name:

```text
GET http://localhost:4000/books?author=shakespeare
```

![Search by author name](/src/assets/search-by-author-name.png)

---

Filter by author ID:

```text
GET http://localhost:4000/books?authorId=1
```

![Filter by author ID](/src/assets/filter-by-authorId.png)

---

Queries can also be combined

```text
GET http://localhost:4000/books?author=shakespeare&year=1603
```

![Queries combined](/src/assets/combined-search.png)

---

## Sorting

Sort books by title
```text
GET http://localhost:4000/books?sort=title
```

![Sort books by title](/src/assets/search-by-title.png)

---

Sort books by year
```text
GET http://localhost:4000/books?sort=year
```

![Sort books by year](/src/assets/search-by-year.png)

---

Sort books in descending order
```text
GET http://localhost:4000/books?sort=year&order=desc
```

![Sort books in descending order](/src/assets/sort-year-descending.png)

---

## Pagination

Books can be split into pages using `page` and `limit`.

```text
GET http://localhost:4000/books?page=1&limit=5
```
Pagination Page 1:

![pagination](/src/assets/pagination-test.png)


Pagination Page 2:

![pagination](/src/assets/pagination-test2.png)

---

## Validation

The API rejects invalid data such as:

- Missing author names
- Empty author names
- Missing book titles
- Empty book titles
- Invalid book years
- Invalid `authorId`
- Books linked to authors that do not exist
- Duplicate books

---

## Error Handling

The API uses standard HTTP status codes.

| Status Code | Meaning |
|-------------|---------|
| `200` | Request successful |
| `201` | Resource created |
| `400` | Invalid request |
| `404` | Resource not found |
| `409` | Conflict |
| `500` | Internal server error |

Duplicate-book response:

![Duplicate book](/src/assets/duplicate-book-test.png)

---

## Middleware

The project includes middleware for:

- JSON body parsing
- Request logging
- Author validation
- Book validation
- Book update validation
- 404 route handling
- Centralized error handling

Example of logger output:

```text
POST /authors
POST /books
GET /books
GET /authors/1/books
PUT /books/1
DELETE /books/1
```

---

## Project Structure

```text
library-api/
    node_modules/
    src/
        assets/
        data/
            store.ts
        middleware/
            errorHandler.ts
            logger.ts
            notFound.ts
            validateAuthor.ts
            validateBook.ts
            validateBookUpdate.ts
        models/
            author.ts
            books.ts
        routes/
            authorsRoutes.ts
            booksRoutes.ts
        servet.ts
    package-lock.json
    package.json
    README.md
    tsconfig.json
```

---

## Testing

The API was tested using **Postman**.

Testing included:

- Creating authors
- Reading authors
- Updating authors
- Deleting authors
- Creating books
- Reading books
- Updating books
- Deleting books
- Invalid author IDs
- Duplicate books
- Missing data
- Invalid data
- Author-book relationships
- Searching and filtering
- Sorting
- Pagination
- Invalid routes
- Malformed JSON

---

## Important Note

This project uses **in-memory arrays** to store authors and books.

This means all data is lost whenever the server restarts.

