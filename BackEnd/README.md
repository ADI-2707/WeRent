# 🚗 WeRent Backend API

WeRent is a car rental platform where users can rent cars and owners can list their vehicles.  
This backend provides REST APIs for user authentication, car listings, bookings, and owner dashboard features.

## 🔗 Base URL
```
http://localhost:3000/api
```


## 🔐 Authentication
Most endpoints require JWT authentication.

Include the token in your request header:


```
Authorization: <your_jwt_token>
```


# 📂 API Categories
- **User API**
- **Car API (Public)**
- **Owner API**
- **Booking API**


## 👤 USER API  

### 1. Register User
Create a new user account.

- **URL**: `/user/register`
- **Method**: `POST`
- **Authentication**: Not required

#### Request Body
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

#### Success Response
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Response
```json
{
    "success": false,
    "message": "User already exists!"
}
```
or
```json
{
    "success": false,
    "message": "Fill all the fields!"
}
```

### 2. Login User
Login with existing credentials.

- **URL**: `/user/login`
- **Method**: `POST`
- **Authentication**: Not required

#### Request Body
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

#### Success Response
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Response
```json
{
    "success": false,
    "message": "User not found"
}
```
or
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

### 3. Get User Data
Retrieve authenticated user's data.

- **URL**: `/user/data`
- **Method**: `GET`
- **Authentication**: Required

#### Headers
```
Authorization: <your_jwt_token>
```

#### Success Response
```json
{
    "success": true,
    "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "image": "",
        "createdAt": "2025-11-06T10:00:00.000Z",
        "updatedAt": "2025-11-06T10:00:00.000Z"
    }
}
```

#### Error Response
```json
{
    "success": false,
    "message": "Not authorized!"
}
```

## 🚘 CAR API (Public)

### 1. Get All Available Cars
Retrieve all cars that are marked as available.

- **URL**: `/cars`
- **Method**: `GET`
- **Authentication**: Not required

#### Success Response
```json
{
    "success": true,
    "cars": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "name": "Toyota Camry",
            "model": "2023",
            "pricePerDay": 50,
            "location": "New York",
            "image": "https://ik.imagekit.io/werent/cars/camry.webp",
            "isAvailable": true,
            "owner": "507f1f77bcf86cd799439012"
        }
    ]
}
```

### 2. Get Car Details
Retrieve details for a single car by id.

- **URL**: `/cars/:id`
- **Method**: `GET`
- **Authentication**: Not required

#### Success Response
```json
{
    "success": true,
    "car": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Toyota Camry",
        "model": "2023",
        "pricePerDay": 50,
        "location": "New York",
        "image": "https://ik.imagekit.io/werent/cars/camry.webp",
        "isAvailable": true,
        "owner": {
            "_id": "507f1f77bcf86cd799439012",
            "name": "Alice Owner",
            "email": "alice@example.com"
        }
    }
}
```

## 🧑‍💼 OWNER API

### 1. Change Role to Owner
Change a user's role to owner, allowing them to list cars.

- **URL**: `/owner/change-role`
- **Method**: `POST`
- **Authentication**: Required

#### Headers
```
Authorization: <your_jwt_token>
```

#### Success Response
```json
{
    "success": true,
    "message": "Now you can list cars!"
}
```

#### Error Response
```json
{
    "success": false,
    "message": "Not authorized!"
}
```

### 2. Add Car
Add a new car listing.

- **URL**: `/owner/add-car`
- **Method**: `POST`
- **Authentication**: Required
- **Content Type**: `multipart/form-data`

#### Request Body
```
image: <file>              // Car image file
carData: {                 // JSON string containing car details
    "name": "Toyota Camry",
    "model": "2023",
    "pricePerDay": 50,
    "location": "New York"
}
```

#### Success Response
```json
{
    "success": true,
    "message": "Car added!"
}
```

### 3. Get Owner Cars
Retrieve all cars listed by the authenticated owner.

- **URL**: `/owner/cars`
- **Method**: `GET`
- **Authentication**: Required

#### Success Response
```json
{
    "success": true,
    "cars": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "name": "Toyota Camry",
            "model": "2023",
            "pricePerDay": 50,
            "location": "New York",
            "image": "https://ik.imagekit.io/werent/cars/camry.webp",
            "isAvailable": true,
            "owner": "507f1f77bcf86cd799439012"
        }
    ]
}
```

### 4. Toggle Car Availability
Toggle the availability status of a car.

- **URL**: `/owner/toggle-car`
- **Method**: `POST`
- **Authentication**: Required

#### Request Body
```json
{
    "carId": "507f1f77bcf86cd799439011"
}
```

#### Success Response
```json
{
    "success": true,
    "message": "Availability toggled!"
}
```

### 5. Delete Car
Remove a car listing.

- **URL**: `/owner/delete-car`
- **Method**: `POST`
- **Authentication**: Required

#### Request Body
```json
{
    "carId": "507f1f77bcf86cd799439011"
}
```

#### Success Response
```json
{
    "success": true,
    "message": "Car removed!"
}
```

### 6. Get Dashboard Data
Retrieve owner's dashboard statistics.

- **URL**: `/owner/dashboard`
- **Method**: `GET`
- **Authentication**: Required (Owner only)

#### Success Response
```json
{
    "success": true,
    "dashboardData": {
        "totalCars": 5,
        "totalBookings": 10,
        "pendingBookings": 2,
        "completedBookings": 8,
        "recentBookings": [
            {
                "_id": "507f1f77bcf86cd799439013",
                "car": {
                    "_id": "507f1f77bcf86cd799439011",
                    "name": "Toyota Camry",
                    "model": "2023"
                },
                "status": "confirmed",
                "price": 150,
                "pickupDate": "2025-11-10T00:00:00.000Z",
                "dropDate": "2025-11-13T00:00:00.000Z"
            }
        ]
    }
}
```
## 📅 BOOKING API

### 1. Check Car Availability
Check if cars are available for the specified dates and location.

- **URL**: `/booking/check-availability`
- **Method**: `POST`
- **Authentication**: Not Required

#### Request Body
```json
{
    "location": "New York",
    "pickupDate": "2025-11-10T00:00:00.000Z",
    "dropDate": "2025-11-13T00:00:00.000Z"
}
```

#### Success Response
```json
{
    "success": true,
    "availableCars": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "name": "Toyota Camry",
            "model": "2023",
            "pricePerDay": 50,
            "location": "New York",
            "image": "https://ik.imagekit.io/werent/cars/camry.webp",
            "isAvailable": true
        }
    ]
}
```

### 2. Create Booking
Create a new car booking.

- **URL**: `/booking/create`
- **Method**: `POST`
- **Authentication**: Required

#### Request Body
```json
{
    "car": "507f1f77bcf86cd799439011",
    "pickupDate": "2025-11-10T00:00:00.000Z",
    "dropDate": "2025-11-13T00:00:00.000Z"
}
```

#### Success Response
```json
{
    "success": true,
    "message": "Booking created!"
}
```

#### Error Response
```json
{
    "success": false,
    "message": "Car is not available!"
}
```

### 3. Get User Bookings
Retrieve all bookings made by the authenticated user.

- **URL**: `/booking/user`
- **Method**: `GET`
- **Authentication**: Required

#### Success Response
```json
{
    "success": true,
    "bookings": [
        {
            "_id": "507f1f77bcf86cd799439013",
            "car": {
                "_id": "507f1f77bcf86cd799439011",
                "name": "Toyota Camry",
                "model": "2023"
            },
            "pickupDate": "2025-11-10T00:00:00.000Z",
            "dropDate": "2025-11-13T00:00:00.000Z",
            "status": "pending",
            "price": 150
        }
    ]
}
```

### 4. Get Owner Bookings
Retrieve all bookings for cars owned by the authenticated owner.

- **URL**: `/booking/owner`
- **Method**: `GET`
- **Authentication**: Required (Owner only)

#### Success Response
```json
{
    "success": true,
    "bookings": [
        {
            "_id": "507f1f77bcf86cd799439013",
            "car": {
                "_id": "507f1f77bcf86cd799439011",
                "name": "Toyota Camry",
                "model": "2023"
            },
            "user": {
                "_id": "507f1f77bcf86cd799439014",
                "name": "John Doe",
                "email": "john@example.com"
            },
            "pickupDate": "2025-11-10T00:00:00.000Z",
            "dropDate": "2025-11-13T00:00:00.000Z",
            "status": "pending",
            "price": 150
        }
    ]
}
```

### 5. Change Booking Status
Update the status of a booking (Owner only).

- **URL**: `/booking/change-status`
- **Method**: `GET`
- **Authentication**: Required (Owner only)

#### Request Body
```json
{
    "bookingId": "507f1f77bcf86cd799439013",
    "status": "confirmed"
}
```

#### Success Response
```json
{
    "success": true,
    "message": "Status update!"
}
```

## Error Handling
All endpoints return JSON responses with a `success` boolean flag indicating whether the request was successful. In case of errors, a `message` field will be included with a description of the error.

## 🧱 Models Overview


### User Model
```javascript
{
    name: String,          // required
    email: String,         // required, unique
    password: String,      // required, min length: 8
    role: String,          // enum: ["owner", "user"], default: "user"
    image: String,         // optional, default: ""
    timestamps: true       // includes createdAt and updatedAt
}
```

### Booking Model
```javascript
{
    car: ObjectId,         // reference to Car model, required
    user: ObjectId,        // reference to User model, required
    owner: ObjectId,       // reference to User model, required
    pickupDate: Date,      // required
    dropDate: Date,        // required
    status: String,        // enum: ["pending", "confirmed", "Cancelled"], default: "pending"
    price: Number,         // required
    timestamps: true       // includes createdAt and updatedAt
}
```

### Car Model
```javascript
{
    name: String,          // required
    model: String,         // required
    image: String,         // required
    pricePerDay: Number,   // required
    location: String,      // required
    isAvailable: Boolean,  // default: true
    owner: ObjectId,       // reference to User model, required
    timestamps: true       // includes createdAt and updatedAt
}
```
## 🏁 Run Backend Locally
```
git clone https://github.com/ADI-2707/WeRent.git 
cd WeRent/BackEnd
npm install
npm run dev
```

## 🤝 Contributing
PRs are welcome!  
For major changes, please open an issue first to discuss what you would like to change.


## 🌐 Connect With Me
**LinkedIn:** https://www.linkedin.com/in/aditya-sing-dev/  
**GitHub:** https://github.com/ADI-2707  
