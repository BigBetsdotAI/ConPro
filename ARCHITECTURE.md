# Chat Agent System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│                     (React Frontend)                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              │ (Port 3000)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ROUTING LAYER                               │
│                    (React Router)                                │
│                                                                   │
│  /chat-agent  ────────► ChatAgentPage Component                 │
│  /admin       ────────► AdminPage Component                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   CHAT AGENT             │   │   ADMIN DASHBOARD        │
│   Component              │   │   Component              │
│                          │   │                          │
│  • Welcome Message       │   │  • Statistics Cards      │
│  • Adaptive Cards        │   │  • Data Table            │
│  • Step-by-step Form     │   │  • Download Button       │
│  • User Input Collection │   │  • Refresh Button        │
│  • Real-time Validation  │   │                          │
└──────────────────────────┘   └──────────────────────────┘
              │                               │
              │ POST /api/save-data           │ GET /api/get-data
              │                               │ GET /api/download-excel
              │                               │
              └───────────────┬───────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API SERVER                            │
│                  (Express.js - Port 5000)                        │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ API Endpoints:                                           │   │
│  │                                                          │   │
│  │  POST   /api/save-data      → Save user data to Excel   │   │
│  │  GET    /api/get-data       → Retrieve all submissions  │   │
│  │  GET    /api/download-excel → Download Excel file       │   │
│  │  GET    /api/health         → Server health check       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Middleware:                                              │   │
│  │  • CORS (Cross-Origin Resource Sharing)                 │   │
│  │  • JSON Body Parser                                      │   │
│  │  • Error Handling                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Read/Write
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE                                │
│                   (Excel File - XLSX)                            │
│                                                                   │
│  File: user_data.xlsx                                           │
│  Location: server/user_data.xlsx                                │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Columns:                                                   │ │
│  │  • Timestamp   → Submission date/time                     │ │
│  │  • Name        → User's full name                         │ │
│  │  • Email       → User's email address                     │ │
│  │  • Phone       → User's phone number                      │ │
│  │  • Company     → User's company name                      │ │
│  │  • Position    → User's role/position                     │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### User Submission Flow

```
┌─────────────┐
│   User      │
│  Opens      │
│ Chat Agent  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Welcome Message │
│   Displayed     │
└──────┬──────────┘
       │
       ▼
┌──────────────────────┐
│ Adaptive Card #1     │
│ (Name Input)         │
└──────┬───────────────┘
       │
       ▼ User Submits
┌──────────────────────┐
│ Adaptive Card #2     │
│ (Email Input)        │
└──────┬───────────────┘
       │
       ▼ User Submits
┌──────────────────────┐
│ Adaptive Card #3     │
│ (Phone Input)        │
└──────┬───────────────┘
       │
       ▼ User Submits
┌──────────────────────┐
│ Adaptive Card #4     │
│ (Company Input)      │
└──────┬───────────────┘
       │
       ▼ User Submits
┌──────────────────────┐
│ Adaptive Card #5     │
│ (Position Select)    │
└──────┬───────────────┘
       │
       ▼ User Submits All Data
┌──────────────────────┐
│  Send POST Request   │
│  to Backend API      │
│  /api/save-data      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Backend Validates   │
│  & Saves to Excel    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Success Message     │
│  Displayed to User   │
└──────────────────────┘
```

### Admin Dashboard Flow

```
┌─────────────┐
│  Admin      │
│  Opens      │
│ Dashboard   │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│  Send GET Request    │
│  to Backend API      │
│  /api/get-data       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Backend Reads       │
│  Excel File          │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Returns JSON Data   │
│  to Frontend         │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Calculate Stats     │
│  • Total Count       │
│  • Today's Count     │
│  • Week's Count      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Display Dashboard   │
│  • Stats Cards       │
│  • Data Table        │
│  • Action Buttons    │
└──────────────────────┘
       │
       │ Admin clicks "Download"
       ▼
┌──────────────────────┐
│  GET Request to      │
│  /api/download-excel │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  File Downloaded     │
│  to Local Machine    │
└──────────────────────┘
```

## Component Structure

```
App.js
├── Layout
│   ├── Header
│   └── Footer
│
├── Routes
│   ├── /chat-agent → ChatAgentPage
│   │   └── ChatAgent Component
│   │       ├── State Management
│   │       │   ├── messages[]
│   │       │   ├── userData{}
│   │       │   └── currentCardIndex
│   │       │
│   │       ├── Adaptive Cards Array
│   │       │   ├── Welcome Card
│   │       │   ├── Name Card
│   │       │   ├── Email Card
│   │       │   ├── Phone Card
│   │       │   ├── Company Card
│   │       │   ├── Position Card
│   │       │   └── Complete Card
│   │       │
│   │       └── Functions
│   │           ├── handleSubmit()
│   │           ├── saveToExcel()
│   │           └── renderAdaptiveCard()
│   │
│   └── /admin → AdminPage
│       └── AdminDashboard Component
│           ├── State Management
│           │   ├── data[]
│           │   ├── stats{}
│           │   └── loading
│           │
│           └── Functions
│               ├── fetchData()
│               ├── calculateStats()
│               ├── handleDownload()
│               └── handleRefresh()
```

## Technology Stack

```
┌─────────────────────────────────────────┐
│           FRONTEND                      │
├─────────────────────────────────────────┤
│  • React 18.2.0                         │
│  • React Router DOM 7.9.3               │
│  • CSS3 (Custom Styling)                │
│  • Adaptive Cards (JSON Format)         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           BACKEND                       │
├─────────────────────────────────────────┤
│  • Node.js                              │
│  • Express.js 4.18.2                    │
│  • CORS 2.8.5                           │
│  • SheetJS (xlsx) 0.18.5                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           DATA STORAGE                  │
├─────────────────────────────────────────┤
│  • Excel (.xlsx format)                 │
│  • File-based storage                   │
│  • Structured rows & columns            │
└─────────────────────────────────────────┘
```

## Security Considerations

```
┌─────────────────────────────────────────────────────┐
│  Current Implementation (Development)               │
├─────────────────────────────────────────────────────┤
│  ✅ CORS enabled for localhost                     │
│  ✅ Input validation (required fields)             │
│  ✅ Email format validation                        │
│  ⚠️  No authentication (public access)             │
│  ⚠️  No rate limiting                              │
│  ⚠️  No data encryption                            │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Production Recommendations                         │
├─────────────────────────────────────────────────────┤
│  🔒 Add authentication for admin dashboard         │
│  🔒 Implement rate limiting (prevent spam)         │
│  🔒 Add HTTPS/SSL encryption                       │
│  🔒 Sanitize user inputs (prevent injection)       │
│  🔒 Add CAPTCHA for bot prevention                 │
│  🔒 Encrypt sensitive data in storage              │
│  🔒 Implement audit logging                        │
└─────────────────────────────────────────────────────┘
```

## Scalability Options

```
Current: File-based (Excel)
    ↓
    │ For higher volume...
    ↓
┌─────────────────────────────────────┐
│  Database Options:                  │
│  • MongoDB (NoSQL)                  │
│  • PostgreSQL (SQL)                 │
│  • MySQL (SQL)                      │
│  • Firebase Realtime DB             │
└─────────────────────────────────────┘
    ↓
    │ For distributed systems...
    ↓
┌─────────────────────────────────────┐
│  Cloud Solutions:                   │
│  • AWS S3 + Lambda                  │
│  • Azure Blob + Functions           │
│  • Google Cloud Storage + Functions │
└─────────────────────────────────────┘
```

---

This architecture provides a foundation for collecting user data through an interactive chat interface while maintaining simplicity and ease of deployment.
