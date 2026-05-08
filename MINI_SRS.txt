# Component 1: Problem, Stakeholders & Mini SRS

**Project Title:** Local Service Marketplace System (LSMS)

---

## 1. Problem Statement
Homeowners often struggle to find reliable, fairly priced local service professionals (plumbers, electricians, etc.) because there is no centralized platform for negotiation. Conversely, providers find it difficult to reach local clients and are often forced into fixed-price models that don't account for job complexity. This leads to **price friction**, **lack of trust**, and **inefficiency** in the local service economy.

## 2. Project Scope
The LSMS is a web-based platform that facilitates the "Post-Bid-Chat" lifecycle. It includes secure user authentication, interactive map-based job posting, a custom bidding engine (InDrive style), real-time messaging, and a rating system. The scope is limited to connecting users and facilitating coordination; it does not currently handle physical payment processing.

## 3. Target Users / Stakeholders
*   **HomeOwners (Clients):** Individuals looking for local help who want to compare multiple bids.
*   **Service Providers (Professionals):** Skilled workers who want to find local jobs and negotiate their own rates.
*   **System Administrator:** Monitors platform health and manages user disputes (Future scope).

## 4. Functional Requirements (What the system does)
*   **FR1: User Authentication:** Users must be able to sign up/login with roles (HomeOwner/Provider).
*   **FR2: Map-Based Job Posting:** HomeOwners must be able to pin job locations on a map and describe their needs.
*   **FR3: Bidding System:** Providers must be able to send custom price offers and pitches on open jobs.
*   **FR4: Acceptance Logic:** HomeOwners must be able to accept a specific bid, which automatically closes the job and opens a chat.
*   **FR5: Real-Time Chat:** Participants must be able to message each other instantly once a booking is active.
*   **FR6: Notification System:** Users must receive real-time alerts for bids, acceptances, and messages.

## 5. Non-Functional Requirements (How the system performs)
*   **NFR1: Real-time Latency:** WebSocket notifications and chat messages must be delivered in under 500ms.
*   **NFR2: Responsive Design:** The interface must be fully functional on both mobile and desktop screens.
*   **NFR3: Security:** User passwords must be hashed using bcrypt; API routes must be protected via JWT.
*   **NFR4: Reliability:** The system must refresh dashboard metrics automatically every 5 seconds.

## 6. Assumptions
*   Users have access to an internet-connected device with a modern web browser.
*   Service providers are honest about their skills and location.

## 7. Constraints
*   **Timeline:** The project must be completed and deployed within the designated 9-week evaluation period.
*   **Technology:** The system leverages a modern full-stack architecture (Node.js, React, and MongoDB) for scalability and real-time performance.
*   **Budget:** The project uses free-tier hosting (Render/Vercel) and open-source libraries.

## 8. Brief Success Criteria
The project is successful if a HomeOwner can post a job, receive at least one bid from a Provider, accept it, and successfully send a real-time message through the integrated chat system within a single testing session.

---

### Evaluation Quick-Check
*   **Problem:** Price friction and lack of trust in finding local help.
*   **Stakeholders:** HomeOwners and Service Providers.
*   **Scope:** From job posting to chat-based coordination.
*   **Assumption:** Users have internet access.
*   **Constraint:** 9-week development timeline.
*   **Success Criterion:** Successful completion of the Post -> Bid -> Accept -> Chat loop.
