# PathBreaker Backend API Documentation

This is the Postman documentation for the backend of the PathBreaker app.

---

## User

### Create User
**POST**  
`http://localhost:3000/api/v1/users`

**Body (JSON):**
```json
{
  "email": "alice@example.com",
  "username": "alice123",
  "firstName": "Alice",
  "lastName": "Example",
  "photo": "https://example.com/photo.jpg"
}
```

---

### Get User by ID
**GET**  
`http://localhost:3000/api/v1/users/68505914777887b1f423efea`

---

### Update User
**PATCH**  
`http://localhost:3000/api/v1/users/68505914777887b1f423efea`

**Body (JSON):**
```json
{
  "firstName": "NewFirstName",
  "lastName": "NewLastName",
  "photo": "https://example.com/newphoto.jpg"
}
```

---

### Delete User
**DELETE**  
`http://localhost:3000/api/v1/users/68505914777887b1f423efea`

---

## Blogs

### Create Blog
**POST**  
`http://localhost:3000/api/v1/blogs`

**Body (JSON):**
```json
{
  "title": "My Blog Title",
  "summary": "Short summary",
  "content": "Full blog content",
  "coverImage": "https://example.com/image.jpg",
  "authorId": "admin",
  "slug": "my-blog-title"
}
```

---

### Get Blog by ID or Slug
**GET**  
`http://localhost:3000/api/v1/blogs/68505be70b63d4d41ba6dfd8`

---

### Get All Blogs
**GET**  
`http://localhost:3000/api/v1/blogs`

---

### Update Blog
**PUT**  
`http://localhost:3000/api/v1/blogs/68505be70b63d4d41ba6dfd8`

**Body (JSON):**
```json
{
  "title": "Updated Blog Title",
  "summary": "Updated summary"
}
```

---

### Delete Blog
**DELETE**  
`http://localhost:3000/api/v1/blogs/68505d7b0b63d4d41ba6dfe0`

---

## Flashcard

### Create Flashcard
**POST**  
`http://localhost:3000/api/v1/flashcards`

**Body (JSON):**
```json
{
  "question": "What is the capital of France?",
  "answer": "Paris",
  "category": "Geography",
  "difficulty": "easy",
  "setTitle": "European Capitals",
  "setDescription": "Capitals of Europe",
  "published": true,
  "createdBy": "admin"
}
```

---

### Get Flashcard by ID
**GET**  
`http://localhost:3000/api/v1/flashcards/68505f99cbb124fc85b968f2`

---

### Get All Flashcards
**GET**  
`http://localhost:3000/api/v1/flashcards`

---

### Update Flashcard
**PUT**  
`http://localhost:3000/api/v1/flashcards/68505f99cbb124fc85b968f2`

**Body (JSON):**
```json
{
  "answer": "Paris, France",
  "difficulty": "medium"
}
```

---

### Delete Flashcard
**DELETE**  
`http://localhost:3000/api/v1/flashcards/68505f99cbb124fc85b968f2`

---

## Study Materials

### Create Study Material
**POST**  
`http://localhost:3000/api/v1/study-materials`

**Body (JSON):**
```json
{
  "title": "Sample Material",
  "description": "This is a sample study material.",
  "category": "Mathematics",
  "content": "Full content here...",
  "fileUrl": "https://example.com/sample.pdf",
  "fileType": "pdf",
  "fileSize": 123456,
  "createdBy": "admin"
}
```

---

### Get All Study Materials
**GET**  
`http://localhost:3000/api/v1/study-materials`

---

### Get Study Material by ID
**GET**  
`http://localhost:3000/api/v1/study-materials/68506394980e46d87cd3a885`

---

### Delete Study Material
**DELETE**  
`http://localhost:3000/api/v1/study-materials/68506394980e46d87cd3a885`

---

### Update Study Material
**PATCH**  
`http://localhost:3000/api/v1/study-materials/68506394980e46d87cd3a885`

**Body (JSON):**
```json
{
  "title": "Updated Material Title",
  "description": "Updated description",
  "fileUrl": "https://example.com/updated.pdf",
  "fileType": "pdf",
  "fileSize": 654321
}
```