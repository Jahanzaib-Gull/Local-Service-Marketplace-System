# Local Service Marketplace System (LSMS)

## Project Introduction
The Local Service Marketplace System (LSMS) is a comprehensive platform designed to bridge the gap between house owners and local service professionals. Finding reliable local services such as plumbers, electricians, cleaners, and AC repair technicians can often be a tedious and uncertain process for homeowners. Conversely, skilled service professionals need a reliable way to find consistent work and connect with clients in their area. 

LSMS solves this problem by providing a centralized, secure, and user-friendly marketplace where homeowners can easily post their service needs, and qualified professionals can browse, accept, and fulfill these requests. By digitizing this interaction, LSMS ensures efficiency, transparency, and trust in local service engagements.

## Features
- **User Registration and Login:** Secure authentication for all platform users.
- **Role-based Access Control:** Distinct interfaces and capabilities for "House Owner" and "Service Provider" roles.
- **Service Request Posting:** Homeowners can create detailed listings for jobs they need completed.
- **Service Request Browsing:** Service providers can view available jobs in their area or matching their skill set.
- **Job Acceptance:** Providers can seamlessly accept service requests they wish to fulfill.
- **Booking Confirmation:** Streamlined process to finalize agreements between owners and providers.
- **User Profile Management:** Users can manage their personal information, skills, and service history.

## System Architecture
The LSMS project is built on a robust and scalable 3-tier architecture to ensure separation of concerns and maintainability:
- **Presentation Layer (Frontend UI):** The user-facing interface, responsible for delivering an intuitive and responsive experience across devices.
- **Application Layer (Backend API and Business Logic):** The core engine that processes user requests, handles authentication, enforces business rules, and moderates the workflow between homeowners and service providers.
- **Data Layer (Database):** The persistent storage system that securely manages user profiles, service requests, booking histories, and system configurations.

## Tech Stack
The project leverages a modern technology stack to deliver high performance and reliability:
- **Frontend:** React / HTML / CSS
- **Backend:** Node.js / Express
- **Database:** MongoDB / MySQL *(Depending on specific module requirements)*
- **UI Design and Prototyping:** Figma

## Project Structure
The repository is organized into distinct directories to keep the codebase clean and modular:

```text
├── frontend/             # React application source code and assets
├── backend/              # Node.js/Express server and API routes
├── database/             # Schema definitions, migrations, and seed data
└── docs/                 # Project documentation, API specs, and design files
```

## Installation and Setup
Follow these steps to get the project running on your local machine for development and testing:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jahanzaib-Gull/Local-Service-Marketplace-System.git
   cd Local-Service-Marketplace-System
   ```

2. **Install dependencies:**
   Navigate to both the frontend and backend directories and install the required npm packages.
   ```bash
   # Terminal 1: Backend
   cd backend
   npm install

   # Terminal 2: Frontend
   cd frontend
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `backend` directory and configure the necessary variables (e.g., database connection strings, API keys, JWT secrets). Refer to `.env.example` if available.

4. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

5. **Start the frontend application:**
   ```bash
   cd frontend
   npm start
   ```

## Usage
1. **House Owners:** Register for an account, log in, and navigate to the dashboard to post a new service request detailing the issue, location, and preferred time.
2. **Service Providers:** Register an account specifying your expertise (e.g., Plumber). Browse the available jobs feed to find requests matching your skills and geographic area. Click "Accept Job" to initiate the booking process.
3. Both parties will be updated via the dashboard upon booking confirmation to proceed with the service execution.

## Contribution Guidelines
We welcome contributions to LSMS! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix (`git checkout -b feature/AmazingFeature`).
3. Commit your changes with clear, descriptive messages (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request detailing your changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Developed as part of the Software Engineering course curriculum.
- Special thanks to IDEAL Labs for their continuous support and resources throughout the development of this project.
