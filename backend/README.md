# User Registration Endpoint

## Endpoint

`POST /users/register`

## Description

Registers a new user by accepting their first name, last name, email, and password. Returns an authentication token and the created user profile.

## Request

**Headers**

- `Content-Type: application/json`

**Body Parameters**

| Field                 | Type   | Required | Description                          |
| --------------------- | ------ | -------- | ------------------------------------ |
| `fullName.firstName`  | string | Yes      | First name (min 3 characters)        |
| `fullName.lastName`   | string | No       | Last name (min 3 characters)         |
| `email`               | string | Yes      | Valid email address                  |
| `password`            | string | Yes      | Password (min 6 characters)          |

### Sample Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "Secret123"
}
```

## Responses

### Success (201 Created)

**Response Body**

```json
{
  "statusCode": 201,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60c72b2f5f1b2c001c8e4b9b",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null,
      "createdAt": "2021-06-14T07:07:11.123Z",
      "updatedAt": "2021-06-14T07:07:11.123Z"
    }
  },
  "message": "User registered successfully",
  "success": true
}
```

### Validation Error (400 Bad Request)

**Response Body**

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ],
  "success": false
}
```

### Server Error (501 Not Implemented)

**Response Body**

```json
{
  "statusCode": 501,
  "message": "Failed to register user",
  "success": false
}
```

---

# User Login Endpoint

## Endpoint

`POST /users/login`

## Description

Authenticates an existing user with their email and password. Returns an authentication token and the user profile upon successful login.

## Request

**Headers**

- `Content-Type: application/json`

**Body Parameters**

| Field      | Type   | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| `email`    | string | Yes      | Valid email address          |
| `password` | string | Yes      | Password (min 6 characters)  |

### Sample Request

```json
{
  "email": "john.doe@example.com",
  "password": "Secret123"
}
```

## Responses

### Success (200 OK)

**Response Body**

```json
{
  "statusCode": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60c72b2f5f1b2c001c8e4b9b",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null,
      "createdAt": "2021-06-14T07:07:11.123Z",
      "updatedAt": "2021-06-14T07:07:11.123Z"
    }
  },
  "message": "User Logged In successfully",
  "success": true
}
```

### Validation Error (400 Bad Request)

**Response Body**

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ],
  "success": false
}
```

### Authentication Error (401 Unauthorized)

**Response Body**

```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "success": false
}
```

### Server Error (500 Internal Server Error)

**Response Body**

```json
{
  "statusCode": 500,
  "message": "Login Failed",
  "success": false
}
```

---

# User Profile Endpoint

## Endpoint

`GET /users/profile`

## Description

Retrieves the profile information of the currently authenticated user. Requires a valid authentication token.

## Request

**Headers**

- `Authorization: Bearer <token>` (or token can be sent via cookies)

**Body Parameters**

None required.

## Responses

### Success (200 OK)

**Response Body**

```json
{
  "statusCode": 200,
  "data": {
    "_id": "60c72b2f5f1b2c001c8e4b9b",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "2021-06-14T07:07:11.123Z",
    "updatedAt": "2021-06-14T07:07:11.123Z"
  },
  "message": "User profile fetched successfully",
  "success": true
}
```

### Authentication Error (401 Unauthorized)

**Response Body**

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "success": false
}
```

### Server Error (500 Internal Server Error)

**Response Body**

```json
{
  "statusCode": 500,
  "message": "Failed to fetch user profile",
  "success": false
}
```

---

# User Logout Endpoint

## Endpoint

`GET /users/logout`

## Description

Logs out the currently authenticated user by clearing the authentication cookie and blacklisting the token to prevent further use.

## Request

**Headers**

- `Authorization: Bearer <token>` (or token can be sent via cookies)

**Body Parameters**

None required.

## Responses

### Success (200 OK)

**Response Body**

```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged out successfully",
  "success": true
}
```

### Authentication Error (401 Unauthorized)

**Response Body**

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "success": false
}
```

### Server Error (500 Internal Server Error)

**Response Body**

```json
{
  "statusCode": 500,
  "message": "Logout failed",
  "success": false
}
```

---

# Captain Registration Endpoint

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) by accepting their personal information, email, password, and vehicle details. Returns an authentication token and the created captain profile.

## Request

**Headers**

- `Content-Type: application/json`

**Body Parameters**

| Field                  | Type   | Required | Description                              |
| ---------------------- | ------ | -------- | ---------------------------------------- |
| `fullName.firstName`   | string | Yes      | First name (min 3 characters)            |
| `fullName.lastName`    | string | No       | Last name (min 3 characters)             |
| `email`                | string | Yes      | Valid email address                      |
| `password`             | string | Yes      | Password (min 6 characters)              |
| `vehicle.color`        | string | Yes      | Vehicle color (min 3 characters)         |
| `vehicle.plate`        | string | Yes      | Vehicle plate number (min 3 characters)  |
| `vehicle.capacity`     | number | Yes      | Vehicle capacity (min 1)                 |
| `vehicle.vehicleType`  | string | Yes      | Vehicle type: "car", "motorcycle", "auto"|

### Sample Request

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "Captain123",
  "vehicle": {
    "color": "White",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Responses

### Success (201 Created)

**Response Body**

```json
{
  "statusCode": 201,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60c72b2f5f1b2c001c8e4b9c",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "White",
        "plate": "ABC1234",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": null,
        "lng": null
      },
      "socketId": null,
      "createdAt": "2021-06-14T07:07:11.123Z",
      "updatedAt": "2021-06-14T07:07:11.123Z"
    }
  },
  "message": "Captain registered successfully",
  "success": true
}
```

### Validation Error (400 Bad Request)

**Response Body**

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ],
  "success": false
}
```

### Conflict Error (409 Conflict)

**Response Body**

```json
{
  "statusCode": 409,
  "message": "Captain with this email already exists",
  "success": false
}
```

### Server Error (500 Internal Server Error)

**Response Body**

```json
{
  "statusCode": 500,
  "message": "Failed to register captain",
  "success": false
}
```
