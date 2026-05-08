# Component 2: Requirements Engineering & Traceability

This document details the mapping between business needs, technical implementation, and quality assurance for the LSMS project.

---

## 1. Functional Requirements (FR)
*   **FR-LOC**: The system shall allow homeowners to pin their exact service location using an interactive map.
*   **FR-BID**: The system shall enable service providers to submit custom price offers and messages on pending jobs.
*   **FR-CHAT**: The system shall facilitate real-time, bidirectional chat between an owner and a provider after an offer is accepted.

## 2. Non-Functional Requirements (NFR)
*   **NFR-SYNC**: The system must update the dashboard metrics and job lists automatically every 5 seconds to ensure data freshness.
*   **NFR-RESP**: The user interface must be fully responsive and professional across all screen sizes (mobile, tablet, and desktop).

## 3. User Stories
*   **As a HomeOwner**, I want to receive and compare multiple price offers for my plumbing job so that I can choose the professional that fits my budget and needs.
*   **As a ServiceProvider**, I want to send a custom pitch and price for a job so that I can negotiate fairly based on the complexity of the work.
*   **As a User**, I want to receive instant notifications for new messages so that I can coordinate the service delivery in real-time.

## 4. Requirements Validation
We validated these requirements through **Prototypes and Peer Testing**:
*   **User Feedback Loop**: We demonstrated the "Map Picker" to a test group to ensure it was easier than typing an address.
*   **Scenario Simulation**: We simulated a job posting and bidding cycle to verify that the "Accept Offer" action correctly closes the job for others, which validated our business logic.

## 5. Requirements Traceability
We used a **Vertical Traceability** approach:
*   **Source**: User need for "Price Choice."
*   **Requirement**: FR-BID (Bidding System).
*   **Design**: `OfferModal.jsx` (UI) and `offerController.js` (Logic).
*   **Database**: `Offers` collection in MongoDB.
*   **Testing**: Test bid submission and verify homeowner receives a real-time notification.

---

## 6. Requirements Traceability Matrix (RTM)

| Requirement ID | Requirement Description | Feature / Module | Test Case | Status |
| :--- | :--- | :--- | :--- | :--- |
| **FR-LOC** | Owner can pin location on Map | `MapPicker.jsx` | Select location and verify address string generation | **Completed** |
| **FR-BID** | Provider can send custom bids | `OfferModal.js` | Send bid and check if it appears on Owner Dashboard | **Completed** |
| **FR-CHAT** | Real-time chat after acceptance | `ChatModal.jsx` | Accept offer and verify chat channel opens | **Completed** |
| **FR-NOTIF**| Instant alerts for bids/messages | `SocketContext.js`| Send message and verify instant browser alert | **Completed** |
| **NFR-SYNC** | 5-second dashboard refresh | `OwnerDashboard.js`| Monitor dashboard and verify auto-update without refresh | **Completed** |

---

### Evaluation Quick-Check (Component 2)
*   **Two FRs:** Map-based location pinning and custom bidding system.
*   **One NFR:** 5-second real-time dashboard synchronization.
*   **Main User Story:** The HomeOwner comparing multiple bids to find the best value.
*   **Validation Method:** Peer testing of the "InDrive" bidding loop to ensure the logic was intuitive.
*   **Traceability Example:** The Chat requirement (FR-CHAT) is implemented in `ChatModal.jsx` and tested by sending messages between two test accounts.
