# Workasana – Task Management & Collaboration App

A full-stack task management application where users can create, manage, filter, and track tasks across teams and projects. The app includes authentication, advanced filtering, reporting, and visualization features for efficient workflow management.
Developed using React JS, React Router, Express, Node JS, MongoDB and Chart.js. 

---

## Demo Link

[Live Demo](https://work-asana.vercel.app/)

---

## Quick Start

```
git clone <your-repo-url>
cd workasana
npm install
npm run dev
```

---

## Technologies

* React JS
* React Router
* Express
* Node JS
* MongoDB
* Chart.js
* Axios
* JWT Authentication

---

## Demo Video

Watch a walkthrough of all major features of this app:[Loom Video](https://www.loom.com/share/520b17afbc324ff28906a80903bef322)

---

## Features

**Authentication**

* User Signup with name, email and password
* User Login with JWT authentication
* Token stored and used for protected routes
* Logout functionality

---

**Task Management**

* Create new tasks with:

  * Task name
  * Project
  * Team
  * Owners
  * Tags
  * Time to complete
  * Status
* Update and delete tasks
* View detailed task information

---

**Task List**

* View all tasks with key details
* Filtering by:

  * Owner
  * Team
  * Tags
  * Project
  * Status
* Sorting by priority and completion time
* URL-based filtering

---

**Project View**

* Tasks grouped by project
* Filter tasks within a project
* View project-wise task distribution

---

**Team View**

* Tasks grouped by teams
* Filter by status and due date
* Analyze team performance

---

**Task Details**

* View complete task information:

  * Project
  * Team
  * Owners
  * Tags
  * Status
  * Time to complete
* Update task status
* Edit task details

---

**Reports**

* Tasks completed in last week
* Total pending work (in days)
* Tasks closed by:

  * Team
  * Owner
  * Project
* Visualized using charts

---

**Filtering System**

* URL-based filtering:

  * /tasks?owner=Tanay
  * /tasks?team=development
* Combine filters:

  * /tasks?team=development&tags=Urgent
* UI updates dynamically based on URL

---

## API Reference

### **POST /auth/signup**<br>

Register new user<br>

Sample Request:<br>

```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

### **POST /auth/login**<br>

Login user and receive JWT<br>

Sample Request:<br>

```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

### **GET /auth/me**<br>

Get authenticated user details

---

### **POST /tasks**<br>

Create a new task<br>

Sample Request:<br>

```
{
  "name": "Design Wireframes",
  "project": "Website Redesign",
  "team": "teamId",
  "owners": ["UserID1", "UserID2"],
  "tags": ["UI", "Urgent"],
  "timeToComplete": 5,
  "status": "To Do"
}
```

---

### **GET /tasks**<br>

Fetch tasks with filters<br>

Example:<br>

```
/tasks?owner=Tanay&team=development&status=InProgress
```

---

### **POST /tasks/:id**<br>

Update a task

---

### **DELETE /tasks/:id**<br>

Delete a task

---

### **POST /teams**<br>

Create a new team

---

### **GET /teams**<br>

Fetch all teams

---

### **POST /projects**<br>

Create a new project

---

### **GET /projects**<br>

Fetch all projects

---

### **POST /tags**<br>

Create tags

---

### **GET /tags**<br>

Fetch all tags

---

### **GET /report/last-week**<br>

Tasks completed in last week

---

### **GET /report/pending**<br>

Total pending work

---

### **GET /report/closed-tasks**<br>

Tasks closed by team/owner/project

---

## Contact

For bugs or feature requests, please reach out to ([adityamoorjmalani53@gmail.com](mailto:adityamoorjmalani53@gmail.com))
