# Firstcall QA Test

### Requirements
- Docker Desktop v20.10.17 or newer

### Installation
- `git clone https://github.com/michaelyohanes/firstcall.git`
- `docker-compose build`
- `docker-compose up -d`
- Wait for the api & app to start (may take some while due to installing packages, etc)

### Services
| #  | Type                   | Url                                             |
|----|------------------------|-------------------------------------------------|
| 1  | App (frontend)         | http://localhost:3000                           |
| 2  | API (backend)          | http://localhost:3001                           |
| 3  | API documentation      | http://localhost:3001/api-docs                  |

### Core techstacks
| Type            | Detail                           | Usage                       |
|-----------------|----------------------------------|-----------------------------|
| API             | Node 18 (active LTS)             | Core engine                 |
| Database        | PostgreSQL 5.13 (latest)         | Database storage            |
| App             | Node 18 (active LTS)             | Core engine                 |
| App             | Next 13 (latest)                 | Framework for SSR           |
| App             | Material UI 5.14 (latest)        | UI library                  |
| App             | Redux Tool Kit 1.9.5 (latest)    | State & hooks for API calls |

### Notes
| #  | Notes                                            | Details                                                                                  |
|----|--------------------------------------------------|------------------------------------------------------------------------------------------|
| 1  | No auth / middleware                             | As per requested on test document (can be added upon further request).                   |
| 2  | API uses nodeJS                                  | Random pick due to simplicity (can refactor to golang, php, python, etc upon request)    |
| 3  | Uses soft delete for deleting user               | Can be restored safely for future proof                                                  |
| 4  | Validation                                       | Uses UI validation and backend validation (sequelize builtin)                            |
| 5  | Last name can be empty                           | As no minimum length provided, assuming lastname is optional                             |
| 6  | Deleted username can't be used for new entry     | Due to username uniqueness and soft delete, new entry won't be able to use same username |
| 7  | Serverside datagrid for pagination               | Serverside datagrid used for pagination, rather than reading whole entries               |
| 8  | Seeder for DB data                               | By default, 2 user entries added. DB can be resetted by calling `npm run init-db` on API |
| 9  | No test unit for both API & UI                   | Can be added upon request                                                                |


### Thumbnails
- API docs
  
![Screenshot 2023-07-13 at 07 15 47](https://github.com/michaelyohanes/firstcall/assets/24835724/ac4f285f-9487-4ab8-b183-4c931749367f)


- Home (Dashboard)
  
![Screenshot 2023-07-13 at 07 14 41](https://github.com/michaelyohanes/firstcall/assets/24835724/1e5ea1b3-23fc-4778-b6e3-2c35eecf512c)


- Add User  

![Screenshot 2023-07-13 at 07 16 53](https://github.com/michaelyohanes/firstcall/assets/24835724/40faa270-7f17-4b52-aff0-c199f962185f)


- Edit User

![Screenshot 2023-07-13 at 07 17 42](https://github.com/michaelyohanes/firstcall/assets/24835724/23a6a0f3-3343-4872-ac0b-576b3a1754de)

  
