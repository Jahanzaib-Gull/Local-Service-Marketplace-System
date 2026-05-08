# Component 4: Business Rules to Database & SE Components

This document maps the real-world business logic of LSMS to its technical implementation in the database and software architecture.

---

## 1. Mapping Table: Rules to Implementation

| Business Rule | Functional Requirement | Module / Controller | Database Collection | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| **Rule 1**: A provider can only send a bid if they haven't already bid on that job. | System shall prevent duplicate offers from the same provider. | `offerController.js` | `Offers` (with unique compound index) | Attempt to send two bids on one job; second bid should fail. |
| **Rule 2**: Only the homeowner who posted the job can accept a bid. | System shall authorize job acceptance based on ownership. | `offerController.js` | `Requests` (linked via `createdBy`) | Login as a different user and try to accept a bid; system should deny access. |
| **Rule 3**: Chat is only accessible after a bid has been formally accepted. | System shall restrict messaging to active bookings only. | `messageController.js` | `Bookings` (status must be 'accepted') | Try to send a message on a pending request; system should block the request. |
| **Rule 4**: Accepting one offer must automatically close the job for others. | System shall update job status to 'active' upon bid acceptance. | `offerController.js` | `Requests` (status updates to 'active') | Accept a bid and verify that other providers can no longer send offers for that job. |

---

## 2. Software Engineering Components

### **A. Middleware (Security & Validation)**
*   **Role**: `authMiddleware.js`
*   **Business Implementation**: Ensures only authenticated users can interact with the DB. It also checks roles (e.g., only a `ServiceProvider` can send an offer).

### **B. Controllers (Business Logic)**
*   **Role**: `offerController.js`, `messageController.js`
*   **Business Implementation**: This is where the actual "Rules" are enforced. For example, the `acceptOffer` logic doesn't just create a booking; it also updates the request status and emits socket notifications.

### **C. Data Layer (Persistence)**
*   **Role**: Mongoose Models (`User.js`, `Request.js`, `Offer.js`, `Booking.js`, `Message.js`)
*   **Business Implementation**: Defines the schema constraints (e.g., `required: true`, `unique: true`) that mirror the business rules at the database level.

---

## 3. Testable Features (Validation)

1.  **Duplicate Bid Prevention**: Verified by trying to submit multiple offers on the same request ID.
2.  **Ownership Authorization**: Verified by ensuring the "Accept" button only appears for the job owner.
3.  **Active-Only Messaging**: Verified by checking if the chat modal initializes only after a booking record exists.

---

### Evaluation Quick-Check (Component 4)
*   **Give one business rule:** "A provider can only bid once on a job to prevent spam."
*   **Which database table supports this?** The `Offers` collection (using a unique index on `request` + `provider`).
*   **Which software module implements it?** The `offerController.js` in the backend.
*   **How will you test it?** By attempting to send a second bid from the same provider account and verifying the 400 Error response.
