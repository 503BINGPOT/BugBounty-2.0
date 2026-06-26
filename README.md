# BugBounty

> BugBounty is a full-stack web application designed to bridge the gap between open-source project maintainers and developers by introducing a bounty-driven contribution system. Instead of relying solely on volunteers, project owners can incentivize development by attaching monetary rewards to GitHub issues, while contributors can discover projects, apply for bounties, submit solutions, and earn rewards for successful contributions.

The platform simplifies the entire collaboration lifecycle by integrating GitHub repositories, issue management, contributor applications, pull request submissions, notifications, and secure payment processing into a single workflow. By eliminating the manual coordination typically involved in open-source collaborations, BugBounty provides a transparent and structured environment for both maintainers and contributors.

![React](https://img.shields.io/badge/React-19-blue)
![Node](https://img.shields.io/badge/Node.js-Express-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![GitHub API](https://img.shields.io/badge/API-GitHub-black)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B)

## Live Demo

**Website:** https://bug-bounty-2-0-x2a7.vercel.app/

**Backend API:** https://bugbounty-backend-qqo4.onrender.com

---

## 🚀 Key Features

### 🔐 Authentication & User Management

* Secure JWT-based authentication
* Password encryption using bcrypt
* GitHub OAuth integration for seamless sign-in
* Role-based access control for Project Owners and Contributors
* Persistent user sessions

### 📂 GitHub Integration

* Connect personal GitHub account
* Fetch and display user repositories
* Import GitHub Issues directly as platform bounties
* Maintain repository associations
* Submit GitHub Pull Request links for completed work
* Webhook handling for pull request events

### 💰 Bounty Management

Project owners can:

* Create custom bounties
* Import existing GitHub issues
* Define reward amount
* Specify difficulty level
* Add detailed acceptance criteria
* Track bounty progress
* Manage active and completed bounties

### 👨‍💻 Contributor Workflow

Contributors can:

* Browse available bounties
* View project details
* Apply for bounties
* Track application status
* Submit Pull Request links
* Receive completion notifications

### 🤝 Application Management

Project owners can:

* Review contributor applications
* Accept or reject applicants
* Monitor submitted pull requests
* Track project completion status

### 🔔 Notification System

The platform automatically generates notifications for important events including:

* Application accepted
* Application rejected
* Pull Request submitted
* Pull Request completion
* Bounty status updates

### 💳 Payment Integration

* Razorpay payment gateway integration
* Secure payment verification
* Reward funding workflow
* Payment status tracking

### 📊 Dashboard & Analytics

Users have access to personalized dashboards displaying:

* Posted bounties
* Applied bounties
* Active projects
* Completed work
* Overall platform activity

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* PostgreSQL (Neon)
* JWT Authentication
* bcrypt
* Passport.js
* GitHub OAuth

### APIs & Services

* GitHub REST API
* GitHub Webhooks
* Razorpay Payment Gateway

---

## ⚙️ Workflow

1. Users register using email/password or GitHub OAuth.
2. Project owners connect one or more GitHub repositories.
3. Existing GitHub issues can be imported directly as bounties or new bounties can be created manually.
4. Contributors browse open bounties and submit applications.
5. Project owners review applications and select contributors.
6. Contributors work on the assigned issue and submit their GitHub Pull Request link.
7. The platform tracks the contribution workflow, updates application status, and keeps both parties informed through notifications.
8. Once the contribution process is complete, the bounty is marked accordingly and the reward workflow is finalized through the integrated payment system.

---

## 🎯 Project Highlights

* Full-stack MERN-style architecture with PostgreSQL
* Secure authentication and authorization
* Third-party OAuth integration
* GitHub API integration
* RESTful API design
* Relational database modeling
* Payment gateway integration
* Webhook-based event handling
* Responsive modern user interface
* Modular and scalable backend architecture

---

## 📚 Learning Outcomes

Building BugBounty provided hands-on experience with:

* Designing scalable full-stack applications
* Building secure authentication systems
* Working with relational databases
* Integrating third-party APIs
* Implementing OAuth authentication
* Managing asynchronous workflows
* Payment gateway integration
* Webhook processing
* REST API development
* Frontend state management
* End-to-end deployment of production-ready web applications

---

## 🚀 Future Enhancements

* Escrow-based automatic bounty payouts
* Real-time messaging between maintainers and contributors
* Live notifications using WebSockets
* Contributor reputation and leaderboard system
* Search and filtering improvements
* Email notifications
* Multi-maintainer repository support
* Advanced analytics dashboard
* Mobile-responsive progressive web application (PWA)

---

## 📄 License

This project was built for learning, portfolio, and demonstration purposes.
