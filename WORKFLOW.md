# LSMS Operational Workflow

This document outlines the end-to-end user journey and technical flow of the Local Service Marketplace System (LSMS).

---

## 1. User Onboarding
*   **Registration**: Users choose between two roles: **HomeOwner** or **ServiceProvider**.
*   **Profile Setup**: Users are encouraged to complete their profiles (Bio, Skills, Phone) to build trust. Providers with detailed profiles receive 3x more offers.

---

## 2. The Service Request Cycle (HomeOwner)
1.  **Job Creation**: The HomeOwner fills out a request form.
    *   **Visual Location**: They use the interactive **Map Picker** to pin the exact service location.
    *   **Reverse Geocoding**: The system translates the map pin into a readable address.
2.  **Publishing**: Once published, the job appears in the public marketplace for all relevant providers.
3.  **Real-time Alerts**: The HomeOwner receives instant **Socket.io notifications** whenever a provider sends a new bid.

---

## 3. The Bidding Phase (ServiceProvider)
1.  **Discovery**: Providers browse the **Marketplace** for jobs matching their skills.
2.  **Negotiation (InDrive Style)**: Instead of a flat "Accept," the provider clicks "Send Offer."
    *   They propose a custom **Price**.
    *   They write a **Pitch** explaining why they are the best fit.
3.  **Submission**: The offer is sent instantly to the HomeOwner's dashboard.

---

## 4. Negotiation & Acceptance
1.  **Bid Review**: The HomeOwner opens their dashboard to see a list of received bids for their request.
2.  **Acceptance**: The HomeOwner selects the best offer.
    *   **Technical Action**: The system marks the request as `active`, creates a `Booking`, and automatically notifies the winning provider.
3.  **Automatic Rejection**: All other pending bids for that specific job are cleared to ensure transparency.

---

## 5. Live Execution & Tracking
1.  **Instant Connection**: A **Live Chat** channel opens immediately between the two parties.
2.  **Live Job Tracking**:
    *   The dashboards display a **Mini Tracking Map** showing the service location.
    *   Users can coordinate arrival times and share details via the chat.
3.  **Socket Notifications**: Both users receive alerts for new messages, ensuring no coordination is missed.

---

## 6. Completion & Reputation
1.  **Closing the Job**: Once the service is performed, the HomeOwner clicks "Finish & Rate Service."
2.  **Feedback Loop**:
    *   The HomeOwner leaves a **Star Rating (1-5)** and written feedback.
    *   **Public Reputation**: The review is saved to the provider's profile, helping them win future bids.
3.  **History**: The job is moved to the "Completed" section of both users' dashboards.

---

## Technical State Transitions

| Action | Request Status | Booking Status | Socket Event |
| :--- | :--- | :--- | :--- |
| **Post Job** | `pending` | - | `new_job_available` |
| **Send Offer** | `pending` | - | `new_offer` |
| **Accept Offer**| `active` | `accepted` | `offer_accepted` |
| **Complete Job**| `completed` | `completed` | `job_finished` |
