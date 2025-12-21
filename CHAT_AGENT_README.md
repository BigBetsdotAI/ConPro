# Chat Agent with Adaptive Cards - Implementation Guide

## Overview

This implementation provides a conversational web chat agent that collects user data step-by-step using Adaptive Cards. The collected data is automatically saved to an Excel file for easy access by HR or administrators.

## Features

✅ **Step-by-Step Data Collection** - Cards appear one at a time  
✅ **Adaptive Cards** - JSON-based interactive cards  
✅ **Conversational UI** - Chat-like experience  
✅ **Auto-save to Excel** - Data stored in structured format  
✅ **Responsive Design** - Works on all devices  
✅ **Real-time Validation** - Input validation before submission  

## Project Structure

```
ConPro/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── ChatAgent.js       # Main chat agent component
│   │       └── ChatAgent.css      # Styling for chat interface
│   └── pages/
│       └── ChatAgentPage.js       # Page wrapper for chat agent
│
├── server/
│   ├── server.js                  # Express backend API
│   ├── package.json               # Backend dependencies
│   └── user_data.xlsx             # Generated Excel file (auto-created)
```

## Installation & Setup

### Step 1: Install Backend Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `xlsx` - Excel file handling
- `nodemon` - Development server (dev dependency)

### Step 2: Start the Backend Server

From the `server` directory:

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The server will start on `http://localhost:5000`

### Step 3: Start the React Frontend

From the project root directory:

```bash
npm start
```

The React app will start on `http://localhost:3000`

## Usage

### Access the Chat Agent

Navigate to: `http://localhost:3000/chat-agent`

### Data Collection Flow

The chat agent will collect the following information in sequence:

1. **Name** - Full name input
2. **Email** - Email address with validation
3. **Phone** - Phone number
4. **Company** - Company name
5. **Position** - Role/position (dropdown selection)

Each field must be completed before moving to the next step.

### Excel File Location

The collected data is saved to:
```
server/user_data.xlsx
```

### Excel File Structure

| Timestamp | Name | Email | Phone | Company | Position |
|-----------|------|-------|-------|---------|----------|
| 12/20/2025 10:30 AM | John Doe | john@example.com | 555-1234 | Acme Corp | Manager |

## API Endpoints

### POST `/api/save-data`

Save user data to Excel file.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "company": "Acme Corp",
  "position": "manager",
  "timestamp": "2025-12-20T10:30:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data saved successfully",
  "rowNumber": 5
}
```

### GET `/api/get-data`

Retrieve all collected data (for admin viewing).

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### GET `/api/download-excel`

Download the Excel file directly.

### GET `/api/health`

Health check endpoint to verify server status.

## Adaptive Cards Configuration

The Adaptive Cards are defined in JSON format within the component. Each card follows this structure:

```javascript
{
  id: 'name',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'What is your name?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Text',
      id: 'name',
      placeholder: 'Enter your full name',
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'name' }
    }
  ]
}
```

### Supported Input Types

- `Input.Text` - Standard text input
- `Input.Text` with `style: 'Email'` - Email validation
- `Input.Text` with `style: 'Tel'` - Phone number input
- `Input.ChoiceSet` - Dropdown selection

## Customization

### Adding More Fields

To add additional data collection fields, edit `ChatAgent.js` and add new cards to the `adaptiveCards` array:

```javascript
{
  id: 'newField',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'Your Question?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Text',
      id: 'newField',
      placeholder: 'Enter value',
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'newField' }
    }
  ]
}
```

Remember to also update:
1. The Excel header row in `server.js`
2. The column widths configuration
3. The validation in the API endpoint

### Styling Customization

Edit `ChatAgent.css` to customize:
- Colors (gradient backgrounds)
- Card sizes and spacing
- Animation effects
- Responsive breakpoints

### Changing Server Port

Edit `server/server.js`:
```javascript
const PORT = process.env.PORT || 5000; // Change to desired port
```

And update the API endpoint in `ChatAgent.js`:
```javascript
const response = await fetch('http://localhost:YOUR_PORT/api/save-data', {
```

## Production Deployment

### Backend Deployment

1. **Environment Variables**: Create `.env` file
```
PORT=5000
NODE_ENV=production
```

2. **Deploy to cloud service** (Heroku, AWS, Azure, etc.)

3. **Update frontend API URL** in `ChatAgent.js` to your production backend URL

### Frontend Deployment

The React app is already configured for deployment. Build and deploy:

```bash
npm run build
npm run deploy
```

## Troubleshooting

### CORS Errors

If you encounter CORS errors, ensure the backend has CORS enabled:
```javascript
app.use(cors());
```

### Excel File Not Created

Check that the server has write permissions in the directory. The file is auto-created on first data submission.

### Data Not Saving

1. Check server logs for errors
2. Verify the backend is running on the correct port
3. Check network tab in browser DevTools for failed requests
4. Ensure all required fields are being sent

## Future Enhancements

Potential improvements:

- [ ] Add file upload capability in Adaptive Cards
- [ ] Implement data encryption
- [ ] Add authentication for admin panel
- [ ] Create admin dashboard to view/manage data
- [ ] Add export to CSV option
- [ ] Implement email notifications
- [ ] Add multi-language support
- [ ] Create analytics dashboard

## Support

For questions or issues, please refer to the main project documentation or contact the development team.

---

**Last Updated**: December 20, 2025  
**Version**: 1.0.0
