# BugBounty 2.0

An open-source bounty platform that connects project owners with contributors by turning GitHub issues into incentivized development tasks.

## Overview

BugBounty 2.0 allows repository owners to create and manage bounties for open-source issues while enabling contributors to apply, submit pull requests, and complete tasks through a GitHub-integrated workflow.

The platform automates the journey from issue discovery to contribution verification, making open-source collaboration more transparent and rewarding.

---

## Features

### Authentication & Security

* JWT-based authentication
* Password hashing with bcrypt
* GitHub OAuth integration
* Role-based access control
* Secure user sessions

### Bounty Management

* Create, update, delete, and manage bounties
* Set reward amount and difficulty level
* Define acceptance criteria
* Track bounty status
* Manage contributor applications

### GitHub Integration

* GitHub OAuth login
* Repository linking
* Fetch user repositories
* Import GitHub issues as bounties
* Pull Request URL submission
* Pull Request merge verification using GitHub API

### Contributor Workflow

* Browse available bounties
* Apply for bounties
* Submit cover letters
* Track application status
* Submit Pull Requests
* Automatic completion tracking after PR verification

### Application Management

* Accept contributor applications
* Reject contributor applications
* Automatic rejection of competing applications after acceptance
* Application history tracking

---

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Passport.js
* JWT
* bcrypt

### Database

* PostgreSQL

### APIs & Integrations

* GitHub OAuth
* GitHub REST API

---

## Database Entities

### Users

* Authentication
* GitHub profile linking
* Roles (Contributor / Project Owner)

### Bounties

* Reward
* Difficulty
* Acceptance Criteria
* GitHub Issue Reference
* Status Tracking

### Applications

* Cover Letter
* Application Status
* Pull Request Tracking
* Completion Timestamp

### Repositories

* Connected GitHub Repositories
* Repository Metadata

---

## Workflow

1. Sign in using Email/Password or GitHub OAuth
2. Connect GitHub Repository
3. Import GitHub Issues as Bounties
4. Contributors Apply for Bounties
5. Project Owner Accepts an Application
6. Contributor Submits Pull Request
7. Platform Verifies Pull Request Status
8. Bounty Marked as Completed after Successful Merge

---

## Current Status

### Implemented

* Authentication
* GitHub OAuth
* Repository Linking
* Issue Import
* Bounty Management
* Contributor Applications
* Pull Request Submission
* Pull Request Verification
* Completion Tracking

### Planned

* GitHub Webhooks
* Razorpay Integration
* Contributor Leaderboards
* Analytics Dashboard
* Automated Payment Release

---

## Installation

### Clone Repository

```bash
git clone https://github.com/503BINGPOT/BugBounty-2.0.git
```

### Install Client

```bash
cd client
npm install
```

### Install Server

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=5000

JWT_SECRET=your_secret

GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

DATABASE_URL=your_database_url
```

### Start Development Servers

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## Future Enhancements

* GitHub Webhook Integration
* Escrow-Based Payments
* Automated Reward Distribution
* Contributor Reputation System
* Repository Analytics
* Activity Feed
* Team Collaboration Features

---

## Author

Dhruv Mantri

GitHub: https://github.com/503BINGPOT
