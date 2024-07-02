# Car Wash Booking System

## Live URL
https://car-wash-booking-system-backend.vercel.app/

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)

## Project Overview

**Car Wash Booking System** is a backend application designed to [insert brief description of the project's purpose]. It leverages modern web development technologies to provide a robust, scalable, and maintainable codebase.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**: Comprehensive Create, Read, Update, Delete functionality for [your resources].
- **Data Validation**: Server-side validation to ensure data integrity.
- **Type Safety**: Using TypeScript for type-safe code.
- **Database Integration**: MongoDB integration with Mongoose.

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **npm**: Node package manager for managing dependencies.

## Setup and Installation

Follow these steps to set up and run the project locally.

### Installation

1. Clone the repository:

   ```sh
 https://github.com/rahmanabdulquadir/car-wash-system-backend.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   NODE_ENV=
   PORT=
   DATABASE_URL=
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=
   ```

## API Endpoints

### User Routes

1. **User Sign Up**

   - **Route:** `/api/auth/signup` (**POST**)
   - **Purpose:** Registers a new user with their personal details and credentials.

2. **User Login**
   - **Route:** `/api/auth/login` (**POST**)
   - **Purpose:** Authenticates a user and returns a JWT token for session management.

### Service Routes

3. **Create Service (Admin Only)**

   - **Route:** `/api/services` (**POST**)
   - **Purpose:** Adds a new car wash service.

4. **Get a Service**

   - **Route:** `/api/services/:id` (**GET**)
   - **Purpose:** Retrieves details of a specific service.

5. **Get All Services**

   - **Route:** `/api/services` (**GET**)
   - **Purpose:** Retrieves all available services.

6. **Update Service (Admin Only)**

   - **Route:** `/api/services/:id` (**PUT**)
   - **Purpose:** Updates details of a specific service.

7. **Delete Service (Admin Only)**
   - **Route:** `/api/services/:id` (**DELETE**)
   - **Purpose:** Soft deletes a specific service.

### Slot Routes

8. **Create Slot (Admin Only)**

   - **Route:** `/api/services/slots` (**POST**)
   - **Purpose:** Adds booking slots for a specific service.

9. **Book a Slot**
   - **Route:** `/api/slots/:id/` (**POST**)
   - **Purpose:** Books a slot for a service.
