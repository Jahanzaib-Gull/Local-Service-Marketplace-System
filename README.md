# Local Service Marketplace System (LSMS)

[![React](https://img.shields.io/badge/Frontend-React%2018-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%2018-green.svg)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Real--time-Socket.io-black.svg)](https://socket.io/)

LSMS is a high-end, real-time marketplace that connects homeowners with skilled local professionals. Built with an **InDrive-style bidding system**, it prioritizes transparency, negotiation, and trust through live communication and visual location tracking.

---

## 🚀 Key Features

### 1. InDrive-Style Bidding System
*   **Negotiable Pricing**: Instead of fixed rates, providers send custom price offers for any job request.
*   **Offer Comparison**: Homeowners can view multiple bids simultaneously, comparing prices, messages, and provider profiles before hiring.
*   **Smart Acceptance**: Accepting an offer automatically converts the request into an active booking and notifies all parties.

### 2. Real-Time Communication & Notifications
*   **Live Chat**: Post-acceptance instant messaging powered by **Socket.io** for coordination and updates.
*   **Instant Notifications**: Real-time alerts for new offers, accepted bids, and incoming messages (both in-app and browser-level).
*   **Live Dashboards**: Metrics and job lists refresh automatically without page reloads.

### 3. Visual Location & Job Tracking
*   **Interactive Map Selection**: Integrated **Leaflet/OpenStreetMap** for pinning exact service locations.
*   **Reverse Geocoding**: Automatically translates map clicks into readable street addresses.
*   **Live Tracking Map**: Active jobs feature a mini-map on the dashboard for real-time location reference.

### 4. Professional Identity & Trust
*   **Extended Profiles**: Users can manage detailed bios, list professional skills, and set profile pictures.
*   **Rating & Reviews**: Comprehensive feedback system to ensure high service standards.
*   **Role-Based Access**: Specialized dashboards for HomeOwners and ServiceProviders.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TailwindCSS, Lucide Icons, Leaflet (Maps) |
| **Backend** | Node.js, Express, Socket.io (WebSockets) |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **State Management** | React Context API (Auth & Socket) |
| **Authentication** | JWT (JSON Web Tokens) with HttpOnly Cookies |

---

## 📂 Project Structure

```text
├── frontend/             # React application (Vite build system)
│   ├── src/components/   # Reusable UI (Chat, Map, Modals, Navbar)
│   ├── src/context/      # Global state (Auth, Socket connections)
│   └── src/pages/        # Dashboard, Marketplace, Profiles, Login/Register
├── backend/              # Express server & API
│   ├── controllers/      # Business logic (Bookings, Offers, Messages)
│   ├── models/           # MongoDB Schemas (User, Offer, Message, Review)
│   └── routes/           # API Endpoints
└── README.md             # Documentation
```

---

## ⚙️ Installation and Setup

### 1. Prerequisites
*   Node.js (v18+)
*   MongoDB Atlas Account
*   NPM or Yarn

### 2. Clone and Install
```bash
git clone https://github.com/Jahanzaib-Gull/Local-Service-Marketplace-System.git
cd Local-Service-Marketplace-System

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 4. Run Locally
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 🎯 Usage Workflow

1.  **Homeowner**: Posts a job request pinning the location on the **Map**.
2.  **Provider**: Browses the **Marketplace** and sends a custom **Offer** (Price + Message).
3.  **Homeowner**: Reviews incoming bids on the **Dashboard** and clicks **Accept**.
4.  **Both Parties**: An **Instant Chat** opens. They coordinate live via the **Tracking Map**.
5.  **Completion**: Homeowner marks the job as finished and leaves a **Review**.

---

## 🤝 Contribution
1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit changes (`git commit -m 'Add NewFeature'`).
4. Push to branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

## 🌟 Acknowledgments
*   Developed as part of the Software Engineering curriculum.
*   Special thanks to **IDEAL Labs** for their support.
*   Maps powered by **OpenStreetMap** and **Leaflet**.
