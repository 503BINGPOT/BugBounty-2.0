# 🐞 BugBounty – Open Source Bounty Platform

BugBounty is a full-stack web application that connects open-source project maintainers with developers by allowing maintainers to post monetary bounties on GitHub issues and contributors to apply, submit pull requests, and earn rewards.

The platform streamlines the collaboration workflow by integrating GitHub repositories, issue importing, contributor applications, and secure payment processing.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure password hashing using bcrypt
* GitHub OAuth login
* Role-based access control

  * Project Owner
  * Contributor

### 👤 User Dashboard

* Personalized dashboard
* View posted bounties
* Track submitted applications
* Manage ongoing contributions
* Notification system for important updates

### 💰 Bounty Management

* Create, edit and delete bounties
* Set reward amount
* Select difficulty level
* Define acceptance criteria
* Track bounty status

### 📝 GitHub Integration

* Connect GitHub account
* Import GitHub repositories
* Fetch repository issues
* Convert GitHub issues into platform bounties
* Submit Pull Request links for review
* Webhook handling for pull request events

### 🤝 Contributor Workflow

* Browse available bounties
* Apply for bounties
* Submit Pull Request URLs
* Track application status
* Receive notifications on acceptance and completion

### 💳 Payment Integration

* Razorpay payment gateway integration
* Secure payment verification
* Bounty funding workflow

### 📊 Admin & Analytics

* Dashboard statistics
* Active bounty tracking
* Contributor activity overview
* Repository management

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

## 📂 Project Structure

```
BugBounty/
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── database/
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/BugBounty.git
cd BugBounty
```

### Install dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server directory.

Example:

```env
DATABASE_URL=
JWT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Start the application

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## Workflow

1. User registers or signs in with GitHub.
2. Project owner connects a GitHub repository.
3. Repository issues are imported as bounties.
4. Contributors browse and apply for bounties.
5. Owners accept contributor applications.
6. Contributors submit Pull Request links.
7. GitHub webhook events are processed to support the bounty workflow.
8. Notifications and payment flow keep both parties updated throughout the contribution lifecycle.

---

## Future Improvements

* Escrow-based automatic reward release
* GitHub Checks API integration
* Real-time notifications using WebSockets
* In-app messaging
* Multi-maintainer support
* Advanced contributor reputation system
* Leaderboards and badges
* Email notifications
* Search and filtering enhancements

---

## Learning Outcomes

This project helped strengthen practical experience with:

* Full-stack application development
* REST API design
* PostgreSQL database modeling
* Authentication and authorization
* OAuth integration
* GitHub API integration
* Payment gateway integration
* Webhook handling
* Deployment-ready backend architecture

---

## License

This project is developed for learning and portfolio purposes.
