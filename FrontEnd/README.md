# WeRent Frontend Documentation

This document provides information about the Frontend implementation of the WeRent car rental application.

## Technology Stack

- **Framework**: React + Vite
- **Styling**: CSS
- **State Management**: React Context API
- **Router**: React Router DOM

## Project Structure

```
FrontEnd/
├── public/                # Public assets
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable components
│   │   ├── Banner.jsx
│   │   ├── CarCard.jsx
│   │   ├── FeaturedSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── NewsLetter.jsx
│   │   ├── Testimonial.jsx
│   │   ├── Title.jsx
│   │   └── owner/       # Owner-specific components
│   │       ├── NavbarOwner.jsx
│   │       ├── Sidebar.jsx
│   │       └── Title.jsx
│   ├── pages/           # Page components
│   │   ├── CarDetails.jsx
│   │   ├── Cars.jsx
│   │   ├── Home.jsx
│   │   ├── MyBookings.jsx
│   │   └── owner/      # Owner dashboard pages
│   │       ├── AddCar.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Layout.jsx
│   │       └── ManageCars.jsx
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Components

### General Components

1. **Navbar.jsx**
   - Main navigation bar for regular users
   - Contains links to Home, Cars, Bookings, and Login/Register

2. **CarCard.jsx**
   - Reusable card component for displaying car information
   - Shows car image, name, price, and booking options

3. **Login.jsx**
   - Handles user authentication
   - Supports both login and registration

4. **Hero.jsx**
   - Landing page hero section
   - Features search functionality for cars

### Owner Dashboard Components

1. **NavbarOwner.jsx**
   - Navigation bar for car owners
   - Access to dashboard features

2. **Sidebar.jsx**
   - Dashboard navigation sidebar
   - Links to manage cars, bookings, and profile

## Pages

### User Pages

1. **Home.jsx**
   - Landing page with hero section
   - Featured cars section
   - Testimonials
   - Newsletter subscription

2. **Cars.jsx**
   - Lists all available cars
   - Filtering options by location and date
   - Search functionality

3. **CarDetails.jsx**
   - Detailed view of a specific car
   - Booking form
   - Car specifications and images

4. **MyBookings.jsx**
   - Lists user's current and past bookings
   - Booking status and details

### Owner Pages

1. **Dashboard.jsx**
   - Overview of owner's statistics
   - Recent bookings
   - Total earnings
   - Number of cars listed

2. **AddCar.jsx**
   - Form to add new car listings
   - Image upload
   - Car details input

3. **ManageCars.jsx**
   - List of owner's cars
   - Toggle availability
   - Edit/Delete cars

4. **ManageBookings.jsx**
   - View and manage booking requests
   - Accept/Reject bookings
   - Booking history

## Features

### User Features
- Search cars by location and date
- Filter cars by price range
- Book cars for specific dates
- View booking history
- User profile management
- Registration and login

### Owner Features
- Dashboard with statistics
- Add and manage car listings
- Handle booking requests
- View earnings
- Profile management
- Toggle car availability

## Getting Started

1. **Installation**
   ```bash
   cd FrontEnd
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Build**
   ```bash
   npm run build
   ```

## API Integration

The frontend communicates with the backend API using the following services:

1. **Authentication**
   - Register: POST `/api/user/register`
   - Login: POST `/api/user/login`
   - Get User Data: GET `/api/user/data`

2. **Cars**
   - Get All Cars: GET `/api/cars`
   - Get Car Details: GET `/api/cars/:id`
   - Add Car: POST `/api/owner/add-car`
   - Update Car: PUT `/api/owner/cars/:id`

3. **Bookings**
   - Create Booking: POST `/api/booking/create`
   - Get User Bookings: GET `/api/booking/user`
   - Get Owner Bookings: GET `/api/booking/owner`

## State Management

The application uses React Context API for state management with the following contexts:

1. **AuthContext**
   - User authentication state
   - Login/Logout functions
   - User data

2. **BookingContext**
   - Booking related state
   - Booking functions
   - Search parameters

## Routing

The application uses React Router for navigation with protected routes for authenticated users and owners:

```javascript
// Public Routes
/               // Home page
/cars           // Car listings
/car/:id        // Car details
/login          // Login/Register

// Protected User Routes
/bookings       // User's bookings
/profile        // User profile

// Protected Owner Routes
/owner/dashboard        // Owner dashboard
/owner/cars            // Manage cars
/owner/add-car         // Add new car
/owner/bookings        // Manage bookings
```

## Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px