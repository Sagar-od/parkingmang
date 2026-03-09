# ParkStory: Parking Management Legacy System

ParkStory is a premium, storytelling-oriented Full-Stack Parking Management System designed to handle exactly 200 premium parking slots. It features a sophisticated administrative portal for vehicle registration and a dedicated Customer Oracle for slot tracking and payment notifications.

## 🌟 Key Features

- **The Grand Ledger (Admin)**: Full control over 200 slots. Add/Remove vehicles, assign Permanent vs Temporary status, and manage multi-month payments.
- **The Resident's Portal (Customer)**: Secure dashboard to view assigned slot details, plate number, and notification stream.
- **The Oracle (Notification Engine)**: Automated logic that tracks payment cycles and alerts residents when payments are due or overdue.
- **Visual Grid Control**: A real-time 200-slot grid visualizer for instant capacity assessment.
- **Storytelling UI**: A dark, luxury-themed interface with gold accents and cinematic backgrounds.

## 🛠 Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Local installation or MongoDB Atlas URI
- **NPM**: v8 or higher

## 🚀 Installation & Setup

1. **Clone the repository and install root dependencies:**
    npm install

2. **Setup Client dependencies:**
    cd client
    npm install
    cd ..

3. **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/parkstory
    JWT_SECRET=park_story_secret_key_2024

4. **Database Setup:**
    Ensure your MongoDB server is running locally on port 27017.

## 🎪 Running the Application

1. **Development Mode (Concurrent):**
    In the root directory, run:
    npm run dev

    This will start the Backend server (port 5000) and Frontend (port 3000) simultaneously.

2. **Accessing the App:**
    - Frontend: `http://localhost:3000`
    - API: `http://localhost:5000`

## 📖 Usage Guide

- **Registration**: Start by creating an account. Choose "Administrator" only if you require management access.
- **Admin Assignment**: Admins can use the "Assign New Vehicle" button. They will need the email of the registered user and specify a slot (1-200).
- **Payment Management**: Admins can click the credit card icon on any occupied slot to add months of parking validity.
- **Automated Messaging**: The system automatically generates notifications visible in the Customer's "Oracle Channel" when a payment cycle is nearing its end or has passed.

## 🏗 Project Structure

- `server/`: Express.js backend with Mongoose models and JWT auth.
- `server/utils/paymentReminder.js`: The cron-like logic for payment checks.
- `client/src/pages/`: Narrative-driven React components.
- `client/src/tailwind.config.js`: Custom theme configuration for the "ParkStory" aesthetic.

## 🛡 Security Note
This application uses JWT for session management. Ensure the `JWT_SECRET` is changed in production environments.
