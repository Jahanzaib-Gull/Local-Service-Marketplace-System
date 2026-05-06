# LSMS Project Specification & Documentation

This document provides a comprehensive technical and business overview of the Local Service Marketplace System (LSMS).

---

## 1. Mini SRS (System Requirements Specification)
**Project Title**: Local Service Marketplace System (LSMS)  
**Objective**: To provide a real-time, bidding-based marketplace connecting homeowners with local service providers.  
**Scope**: User authentication, job posting with map integration, InDrive-style bidding, real-time chat, and notification system.

---

## 2. Requirements
### Functional Requirements (FR)
*   **FR1**: Users must be able to register as either a HomeOwner or ServiceProvider.
*   **FR2**: HomeOwners must be able to pin job locations on an interactive map.
*   **FR3**: ServiceProviders must be able to submit custom price bids (Offers) on jobs.
*   **FR4**: The system must facilitate real-time chat once a bid is accepted.
*   **FR5**: The system must send instant push notifications for bids and messages.

### Non-Functional Requirements (NFR)
*   **NFR1 (Performance)**: Real-time updates should have less than 500ms latency (Socket.io).
*   **NFR2 (Security)**: Password hashing using bcrypt and JWT-based session management.
*   **NFR3 (Usability)**: Responsive UI compatible with mobile and desktop (Tailwind CSS).

---

## 3. User Stories
*   **HomeOwner**: "As a homeowner, I want to see multiple price offers for my plumbing leak so that I can choose the most affordable and reliable professional."
*   **ServiceProvider**: "As a technician, I want to propose my own rates for jobs so that I can maintain a profitable business based on the complexity of the work."
*   **System**: "As a user, I want to receive instant alerts for new messages so that I don't miss critical project updates."

---

## 4. MoSCoW Analysis
*   **Must Have**: Authentication, Job Posting, Bidding System, Acceptance Logic, Real-time Chat.
*   **Should Have**: Map Integration, Profile Customization (Bio/Skills), Push Notifications.
*   **Could Have**: Payment Gateway Integration, Advanced Search Filters.
*   **Won't Have (for now)**: Video calling, AI-based price recommendations.

---

## 5. MVP Definition (Simple MVP)
The **Minimum Viable Product** focuses on the core "Post-Bid-Chat" loop:
*   A HomeOwner posts a job with a location.
*   A Provider sends a price offer.
*   The HomeOwner accepts.
*   They communicate via chat to finish the job.

---

## 6. Main Feature & Business Requirement
**Main Feature**: The **InDrive-Style Bidding System**.  
**Core Business Requirement**: To eliminate fixed-price friction and foster **Market-Driven Negotiation**. By allowing providers to bid, the platform ensures fair market value and gives homeowners choice, which is the primary driver of trust and user retention.

---

## 7. Business Rules to Database Mapping
*   **Rule**: A provider cannot bid twice on the same job. → **DB**: Unique compound index on `Offer` (requestId + providerId).
*   **Rule**: Messaging is only allowed for active bookings. → **DB**: `Message` model requires a `bookingId` reference; controller validates booking status.
*   **Rule**: Accepting an offer rejects all others. → **DB**: `acceptOffer` controller performs a bulk update on the `Offers` collection.

---

## 8. ERD (Entity Relationship Diagram - Crow's Foot)
*   **User** (1) ---- (N) **Request**: One user can post many requests.
*   **Request** (1) ---- (N) **Offer**: One request can receive many bids.
*   **Offer** (1) ---- (1) **Booking**: An accepted offer becomes exactly one booking.
*   **Booking** (1) ---- (N) **Message**: One booking contains many chat messages.
*   **Booking** (1) ---- (1) **Review**: One booking receives one review.

---

## 9. Sequence Diagram (The Bidding Flow)
1.  **HomeOwner** posts Request -> **Backend** saves to DB -> **Socket** emits to all Providers.
2.  **Provider** sends Offer -> **Backend** saves Offer -> **Socket** notifies HomeOwner.
3.  **HomeOwner** accepts Offer -> **Backend** creates Booking -> **Socket** notifies Provider.
4.  **Chat Channel** opens -> **Socket** facilitates bidirectional messaging.

---

## 10. System Architecture (3-Tier)
*   **Client Tier**: React.js / Vite (Handles UI & WebSocket events).
*   **Business Logic Tier**: Node.js / Express (Handles API, Auth, and Socket broadcasting).
*   **Data Tier**: MongoDB Atlas (Persistent storage for JSON-like documents).

---

## 11. Design Quality: Coupling & Cohesion
*   **High Cohesion**: Each controller (e.g., `offerController`) is strictly responsible for one domain of the business logic, making it easy to test and maintain.
*   **Low Coupling**: The Frontend and Backend communicate via a clean REST API and standardized Socket events, allowing them to be updated or replaced independently.

---

## 12. RTM (Requirements Traceability Matrix)
| Req ID | Feature | Implementation | Status |
| :--- | :--- | :--- | :--- |
| FR2 | Map Location | `MapPicker.jsx` | Completed |
| FR3 | Bidding | `OfferModal.jsx` / `offerController.js` | Completed |
| FR4 | Real-time Chat | `ChatModal.jsx` / `socket.io` | Completed |
| FR5 | Notifications | `NotificationDropdown.jsx` | Completed |

---

## 13. UX (User Experience) Design
*   **Aesthetics**: Sleek dark/light mode with "Plus Jakarta Sans" typography.
*   **Feedback**: Micro-animations for loading states and bounce effects for new notifications.
*   **Simplicity**: One-click bid acceptance to reduce cognitive load for homeowners.
