# LSMS Final Evaluation: Presentation & Demo Guide

This guide ensures your team follows the **Strict Evaluation Rules** to secure the maximum 15 marks. 

---

## 🚀 The "Rule 1" Checklist (Mandatory Items)
Before the evaluation, ensure you have these 8 files open and ready to show:
1.  `MINI_SRS.md` (Problem & Scope)
2.  `COMPONENT_2_REQUIREMENTS.md` (FR/NFR, User Stories, RTM)
3.  `COMPONENT_3_MVP_SCOPE.md` (MVP & MoSCoW)
4.  `COMPONENT_4_BUSINESS_RULES.md` (Business Logic to DB)
5.  `COMPONENT_5_ERD.md` (Crow's Foot Data Map)
6.  `COMPONENT_6_UML_DIAGRAMS.md` (Use Case, Sequence, Activity)
7.  `COMPONENT_7_ARCHITECTURE.md` (3-Tier Structure & Quality)
8.  `COMPONENT_8_MVP_UX.md` (Team Roles & UX)

---

## 💡 The "Rule 2" Strategy: How to Answer Like a Pro
Never give dictionary definitions. Always connect to the project.

| Question | Weak Answer (Theory) | **Strong Answer (Project Focused)** |
| :--- | :--- | :--- |
| **What is your architecture?** | "Architecture is how we build software." | "Our system uses a **3-Tier Architecture**. The **Presentation layer** handles the React dashboards, the **Logic layer** handles bidding rules in Node.js, and the **Data layer** persists jobs in MongoDB." |
| **Explain your ERD.** | "ERD shows tables and keys." | "Our ERD shows that one **Request** can have many **Offers**. This '1-to-Many' relationship is crucial because it allows homeowners to compare multiple prices." |
| **What is your MVP?** | "MVP is the smallest version." | "Our MVP is the **Post-Bid-Chat loop**. It’s the smallest useful version that solves our main problem: **Price Discovery** and **Trust** between owners and pros." |
| **What is a Business Rule?** | "It's a real-world rule." | "One of our rules is: **A provider cannot bid twice on the same job.** We implement this in our `Offers` collection with a unique compound index to prevent spam." |

---

## 🎥 The "Working MVP" Demo Script
Follow these steps for a 1.5-mark demonstration:

1.  **Step 1: The Setup**: Have two browsers open. (Owner in Chrome, Provider in Incognito).
2.  **Step 2: Posting**: As the Owner, pin a location on the **Leaflet Map** and post a "Leaking Tap" request.
3.  **Step 3: Bidding**: Switch to the Provider. Browse the marketplace and send a **Custom Offer** (e.g., $50).
4.  **Step 4: Real-time Alert**: Show the **Notification Bell** on the Owner's screen bouncing instantly (thanks to Socket.io).
5.  **Step 5: Acceptance**: As the Owner, accept the bid. Show the job status change.
6.  **Step 6: Coordination**: Open the **Chat Modal** and send a "Hello" from the Owner. Show it appearing instantly on the Provider's screen.

---

## 🛡️ Avoiding Marks Deduction (The "Rule 3" Shield)
*   **Cardinality**: If they ask about the ERD, point out the **Crow's Foot** symbols (the forks).
*   **Layers**: If they ask about Architecture, show the **Frontend/Backend/DB** folders in your project.
*   **Teamwork**: If they ask how you divided work, use the table in `COMPONENT_8_MVP_UX.md`.
*   **Validation**: If they ask how you validated requirements, say: "We used **Peer Testing** to ensure the Map and Chat felt intuitive for non-technical users."

**Good luck, Team! You have everything you need for 15/15.**
