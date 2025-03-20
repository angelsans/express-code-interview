## Get Started
This repository consists of a basic [express](http://expressjs.com/) API server.

API will run on port *3001* by default

### 1. Prerequisites

- [NodeJs](https://nodejs.org/en/)
- [NPM](https://npmjs.org/) 

### 2. Installation

On the command prompt run the following commands:

``` 
 $ git clone https://github.com/angelsans/express-code-interview
 $ cd express-code-interview
 $ cd server
 $ npm install
 $ npm run start
```

### 3. Usage
 
#### API URL
Base URL: `http://localhost:3001/api`
 
#### For Users
Endpoint: `http://localhost:3001/api/users`
 
##### Query Parameters:
- **page**: *(optional)* Integer, default value is `1`.
- **size**: *(optional)* Integer, range from `1` to `100`, default value is `50`.
- **sort**: *(optional)* Can be `id` or `name`. You can also specify the order by appending `asc` (ascending) or `desc` (descending), separated by a space or `%20`.
 
##### Example:
Request with no params:
GET http://localhost:3001/api/users
 
```json
Response 200:
{
    "data": [
        {
            "name": "Jorn",
            "id": 0
        },
        {
            "name": "Markus",
            "id": 3
        },
        {
            "name": "Andrew",
            "id": 2
        },
        {
            "name": "Ori",
            "id": 4
        },
        {
            "name": "Mike",
            "id": 1
        }
    ],
    "paging": {
        "totalResults": 5
    }
}
```

Request with pagination params:
GET http://localhost:3001/api/users?page=1&size=20

```json
Response 200:
{
    "data": [
        {
            "name": "Jorn",
            "id": 0
        },
        {
            "name": "Markus",
            "id": 3
        },
        {
            "name": "Andrew",
            "id": 2
        },
        {
            "name": "Ori",
            "id": 4
        },
        {
            "name": "Mike",
            "id": 1
        }
    ],
    "paging": {
        "totalResults": 5
    }
}
```

GET http://localhost:3001/api/users?page=1&size=1

```json
Response 200:
{
    "data": [
        {
            "name": "Jorn",
            "id": 0
        }
    ],
    "paging": {
        "next": "/api/users?page=2&size=1",
        "totalResults": 5
    }
}
```


GET http://localhost:3001/api/users?page=5&size=1

```json
Response 200:
{
    "data": [
        {
            "name": "Mike",
            "id": 1
        }
    ],
    "paging": {
        "previous": "/api/users?page=4&size=1",
        "totalResults": 5
    }
}
```

Request with pagination and sort params:
GET http://localhost:3001/api/users?page=1&size=20&sort=id%20asc

```json
Response 200:
{
    "data": [
        {
            "name": "Jorn",
            "id": 0
        },
        {
            "name": "Mike",
            "id": 1
        },
        {
            "name": "Andrew",
            "id": 2
        },
        {
            "name": "Markus",
            "id": 3
        },
        {
            "name": "Ori",
            "id": 4
        }
    ],
    "paging": {
        "totalResults": 5
    }
}
```

GET http://localhost:3001/api/users?page=1&size=20&sort=id%20desc

```json
Response 200:
{
    "data": [
        {
            "name": "Ori",
            "id": 4
        },
        {
            "name": "Markus",
            "id": 3
        },
        {
            "name": "Andrew",
            "id": 2
        },
        {
            "name": "Mike",
            "id": 1
        },
        {
            "name": "Jorn",
            "id": 0
        }
    ],
    "paging": {
        "totalResults": 5
    }
}
```

##### Handling errors:
Wrong query params:

GET http://localhost:3001/api/users?page=a

```json
Response 400:
{
    "code": 400,
    "message": "Invalid query parameters",
    "errors": [
        {
            "message": "\"page\" must be a number"
        }
    ]
}
```

GET http://localhost:3001/api/users?size=b

```json
Response 400:
{
    "code": 400,
    "message": "Invalid query parameters",
    "errors": [
        {
            "message": "\"size\" must be a number"
        }
    ]
}
```

GET http://localhost:3001/api/users?sort=lastName

```json
Response 400:
{
    "code": 400,
    "message": "Invalid sort query param",
    "errors": [
        {
            "message": "\"value\" must be one of [id, name]"
        }
    ]
}
```

GET http://localhost:3001/api/users?anotherParam=1
```json
Response 400:
{
    "code": 400,
    "message": "Invalid query parameters",
    "errors": [
        {
            "message": "\"anotherParam\" is not allowed"
        }
    ]
}
```

#### For testing
For testing with jest please run the following command:
npm run test
