# Component 3: MVP, Scope & MoSCoW Prioritization

This document defines the core focus of the LSMS project and how we prioritized features to solve the primary business problem.

---

## 1. MVP Definition (Minimum Viable Product)
The MVP for LSMS is a **"Real-time Bidding & Coordination Loop."**  
It is the smallest version of the platform that allows a homeowner to post a specific need, receive competitive pricing from local pros, and coordinate the work through a secure chat. This directly solves the core problem of **price friction** and **lack of trust** in the local service market.

## 2. MoSCoW Prioritization

### 🟢 Must Have (Critical for MVP)
*   **User Authentication**: Secure login for owners and providers.
*   **Job Posting**: Ability for owners to describe a job and pin its location.
*   **Bidding System**: Ability for providers to send custom price offers.
*   **Acceptance Logic**: Transitioning a job from "Open" to "Active" once a bid is chosen.
*   **Basic Real-time Chat**: Text communication between participants after hiring.

### 🟡 Should Have (High Priority)
*   **Real-time Notifications**: Instant alerts when a new bid or message arrives.
*   **Auto-Refreshing Dashboards**: Ensuring users see data updates without manual refresh.
*   **Interactive Map Selection**: Visual pin-dropping for job locations.

### 🔵 Could Have (Low Priority)
*   **Detailed User Profiles**: Bio, skills, and profile pictures.
*   **Review & Rating System**: Leaving feedback after job completion.
*   **Job Category Filtering**: Sorting jobs by type (Plumbing, Electrical, etc.).

### 🔴 Won't Have (Excluded for this Phase)
*   **Integrated Payments**: Handling transactions directly within the app.
*   **Video Consultations**: Live video calls between owners and providers.
*   **AI Price Estimation**: Automatically suggesting a fair price for a job.

---

## 3. Scope Boundary
**In-Scope**:  
*   Facilitating the discovery and negotiation process.  
*   Enabling secure real-time coordination between two parties.  
*   Visualizing service locations on a map.

**Out-of-Scope**:  
*   Background checks or identity verification for providers.  
*   Handling of financial disputes or insurance.  
*   Providing physical tools or supplies for the jobs.

---

### Evaluation Quick-Check (Component 3)
*   **What is your MVP?** The "Post-Bid-Chat" loop which facilitates price negotiation.
*   **Most important feature?** The InDrive-style bidding engine (Offers).
*   **What did you exclude?** Integrated payments, as it adds significant security complexity outside our current 9-week scope.
*   **Why is Bidding a "Must" and not a "Should"?** Because without custom bidding, we are just another fixed-price directory. Bidding is our **Unique Value Proposition** and the only way to solve price friction.
