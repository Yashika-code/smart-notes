# Smart Notes API

Welcome to **Smart Notes API** — a simple and smart backend service for managing notes.  
This API lets you create, read, update, and search notes with helpful features like input validation, intelligent search, and rate limiting.

---

## 🧠 What This Project Does

Smart Notes API is a RESTful backend built with **Node.js** and **Express** that helps you:

- ✏️ Create notes
- 📄 List all notes
- 🔁 Update existing notes
- 🔍 Search notes by keywords

This isn’t just a basic notes app — it includes useful features like:

✔ Required fields (`title` and `content`)  
✔ Extra spaces trimmed automatically  
✔ Empty strings rejected  
✔ Search that is case-insensitive and flexible  
✔ Limited note creation (max 5 per minute) to prevent misuse

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| Create Note | Add a new note with title and content |
| Get All Notes | View all saved notes sorted by recent updates |
| Update Note | Change note title/content with intelligent change detection |
| Search Notes | Search both title and content with partial matches |
| Rate Limit | Restrict creation to 5 notes per minute |

---

## 🧩 Tech Stack

This project is built using:

- **Node.js**
- **Express**
- **JavaScript (ES Modules)**
- **dotenv** for environment variables

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Yashika-code/smart-notes.git
cd smart-notes
