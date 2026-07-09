# Inventory Management System

A full-stack inventory management application built with Angular, Node.js, Express, PostgreSQL, and Sequelize.

The application allows users to manage inventory items, filter and sort data, paginate through records, and view location-based inventory statistics.

## Features

### Inventory Management
- View all inventory items
- Create new items
- Delete items
- Filter items by location
- Sort items in ascending or descending order by:
  - Name
  - Price
  - Location
- Pagination with configurable page size

### Location Management
- Display available inventory locations
- Associate items with locations
- View inventory statistics grouped by location

### Statistics Dashboard
- Total number of items per location
- Total inventory value per location
- SQL aggregation queries using:
  - COUNT
  - SUM
  - GROUP BY

## Technologies

### Frontend
- Angular
- TypeScript
- Bootstrap
- RxJS
- Angular Router

### Backend
- Node.js
- Express.js
- TypeScript
- Sequelize ORM
- PostgreSQL

## Architecture

The application follows a layered architecture, shown with example of one of the endpoints:
-  starting from front end, example of items list table:
    1. when first navigating to site, angular's component, items-list is loaded(containts item-list.ts and items-list.html). 
    2. when items-list component is loaded, OnInit function runs one when loaded, it calls helper function loadPage()
    3. loadPage() is used to send get request for getting list of items, but not directly, it first calls frontend service function getItems()
    4. getItems is declared and imlemented in searate file, in class of ItemService. 
    5. getItems function uses httpClient to send http GET request with page paramater(optionally filtering and sorting paraeters) to url given and waits for the response.
- On Backend:
    6. routes, endpoint urls and their coresponding controller functions are declared in separate routes.ts file.
    7. nce server recieves request, it mathces it to declared url route in routes.ts, in this case "GET /api/inventories". 
    8. if matched properly, coresponding controler function, which for example request is getAllHandler() in itemsController.ts.
    9. getAllHandler() takes request, extracts data, extracts page parameter for pagination, optionally sorting and filterin params. 
    10. then getAllHandler() calls backend service async function getAllItems() of itemService.ts.
    11. getAllItems() queryes the database with sequelize, gets 20 items only, skips first 20*(pageParam-1) items, also gets totalCount of items. 
    12. it return result to controler function, which if returned value isnt error, sends back result as json back to frontend. 
- recieving:
    13. frontedn service function getItems() recieves the response, returns the data recieved to items-list function loadPage.
    14. loadPage extracts data, and displays recieved data in html.



## How to Run

### Prerequisites

Make sure you have installed:

- Node.js
- PostgreSQL
- Angular CLI

---

### Backend

1. Navigate to the backend directory.

```bash
cd backend
```

2. Install dependencies.

```bash
npm install
```

3. Configure your PostgreSQL database and update the database configuration (or `.env` file if you use one), change database password.
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD="your_database_password"
PORT=3000
DB_NAME=inventory_db
```

4. Start the backend server.

```bash
npm start
```

The backend will run on:

```
http://localhost:3000
```

---

### Frontend

1. Navigate to the frontend directory.

```bash
cd frontend
```

2. Install dependencies.

```bash
npm install
```

3. Start the Angular development server.

```bash
ng serve
```

The frontend will run on:

```
http://localhost:4200
```

---

### Using the Application

1. Open `http://localhost:4200` in your browser.
2. Browse the inventory list.
3. Add new inventory items.
4. Filter and sort items.
5. View inventory statistics.


## Screenshots

### Inventory List

![Inventory List](screenshots/inventory.png)

### Add Item

![Add Item](screenshots/inventoryadd.png)

### Statistics

![Statistics](screenshots/inventorystats.png)

### Pagination 

![pagination](screenshots/inventorypagination.png)

![pagination](screenshots/inventorypagination.png)

