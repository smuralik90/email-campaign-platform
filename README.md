

# Email Campaign Platform

email-campaign-platform building

## Overview

Email Campaign Platform is a production-style full-stack email marketing application built using React, Node.js, PostgreSQL, and AWS cloud services.

The platform allows users to:

* Manage contacts
* Import contacts using CSV
* Build email templates visually
* Create marketing campaigns
* Send emails using AWS SES
* Process large email sends using AWS SQS queue architecture
* Track sending progress
* Manage segments and filters

This project follows scalable queue-based architecture similar to real-world platforms like Mailchimp, SendGrid, and ConvertKit.

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Unlayer Drag & Drop Email Builder

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## Cloud Services

* AWS SES (Email Sending)
* AWS SQS (Queue System)

---

# Features

## Module M1 — Authentication & User Management

* JWT Authentication
* Login System
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access
* Logout System
* Dashboard Access Control

---

## Module M2 — Contact List Management

* Add Contacts
* Delete Contacts
* Bulk Delete
* CSV Import System
* Search & Filters
* Contact Detail Page
* Event History Timeline
* Smart Segments Builder
* Protected APIs

---

## Module M3 — Email Template Builder

* Drag & Drop Email Builder
* Template Library
* Responsive Email Design
* Save Templates
* Duplicate Templates
* HTML Export
* Personalization Tags
* Search & Filter Templates

---

## Module M4 — Campaign Engine

* Campaign Creation
* Subject Line Management
* Preview Text
* Sender Configuration
* Template Selection
* Campaign Database
* Delivery Tracking
* AWS SES Integration

---

## Module M5 — Scheduling & Sending

* AWS SQS Queue-Based Architecture
* Background Worker
* Queue Processing
* Send Now
* Scheduled Campaigns
* Live Progress Tracking
* SES Worker Processing
* Campaign Status Updates

---

# System Architecture

## Email Sending Flow

1. User creates campaign
2. Contacts are selected
3. Campaign queued into AWS SQS
4. Background worker processes queue
5. Worker sends emails using AWS SES
6. Delivery tracking stored in PostgreSQL

This architecture prevents server crashes during large email sends and follows production-level cloud architecture.

---

# Database Tables

## Users

Stores authentication and user roles.

## Contacts

Stores subscriber contact details.

## Contact Lists

Stores grouped contact lists.

## Segments

Stores smart filter rules.

## Templates

Stores email templates and HTML designs.

## Campaigns

Stores campaign information.

## Campaign Recipients

Tracks delivery status for each contact.

## Email Events

Stores open/click/bounce event history.

---

# AWS Services Used

## AWS SES

Used for:

* Email delivery
* Transactional sending
* Marketing campaigns

## AWS SQS

Used for:

* Queue-based sending
* Background processing
* Stable architecture

---

# Installation Guide

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
```

---

## Backend Setup

Open backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run backend:

```bash
npx nodemon server.js
```

---

## Frontend Setup

Open frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

---

# Environment Variables

Create `.env` inside backend:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=email_platform
DB_PASSWORD=YOUR_PASSWORD
DB_PORT=5432

JWT_SECRET=YOUR_SECRET

AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
AWS_REGION=ap-south-1

AWS_SQS_QUEUE_URL=YOUR_QUEUE_URL
```

---

# API Modules

## Authentication APIs

* Register User
* Login User
* JWT Verification

## Contact APIs

* Add Contact
* Get Contacts
* Delete Contact
* Bulk Delete
* CSV Import

## Template APIs

* Create Template
* Get Templates
* Duplicate Template

## Campaign APIs

* Create Campaign
* Send Campaign
* Schedule Campaign
* Campaign Progress

---

# Queue Worker

Worker continuously:

* Reads messages from AWS SQS
* Sends emails using AWS SES
* Updates campaign tracking
* Deletes processed messages

Run worker:

```bash
node worker.js
```

---

# Frontend Pages

* Login Page
* Dashboard
* Contacts
* Add Contact
* Import Contacts
* Segments Builder
* Template Library
* Template Editor
* Campaign Creator

---

# Future Enhancements

* Analytics Dashboard
* Open/Click Tracking
* Bounce Tracking
* A/B Testing
* Automation Workflows
* Multi-user Teams
* Campaign Reports
* Webhooks
* SMTP Support

---

# Project Status

## Completed Modules

* M1 — Authentication & User Management
* M2 — Contact Management
* M3 — Email Template Builder
* M4 — Campaign Engine
* M5 — Scheduling & Sending

---

# Author

Murali

---

# License

This project is developed for educational and portfolio purposes.
