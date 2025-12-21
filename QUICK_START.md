# 🚀 Quick Start Guide - Chat Agent with Adaptive Cards

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation Steps

### Option 1: Automated Setup (Windows)

Simply double-click the `start-chat-agent.bat` file in the project root directory. This will:
1. Install backend dependencies
2. Start the backend server
3. Start the frontend application

### Option 2: Manual Setup

Follow these steps for manual installation:

#### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

This installs:
- `express` - Backend framework
- `cors` - Cross-origin support
- `xlsx` - Excel file handling
- `nodemon` - Development auto-reload

#### Step 2: Start Backend Server

In the `server` directory:

```bash
# Development mode (recommended)
npm run dev

# OR Production mode
npm start
```

You should see:
```
🚀 Server is running on http://localhost:5000
📊 Excel file location: C:\...\server\user_data.xlsx
```

#### Step 3: Start Frontend Application

Open a **new terminal** in the project root directory:

```bash
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`

## Accessing the Chat Agent

Once both servers are running, access the features:

### For Users (Data Collection):
Navigate to: **http://localhost:3000/chat-agent**

This is the conversational interface where users will:
1. Enter their name
2. Provide email address
3. Share phone number
4. Enter company name
5. Select their position/role

### For Administrators (View Data):
Navigate to: **http://localhost:3000/admin**

The admin dashboard shows:
- Total submissions count
- Today's submissions
- This week's submissions
- Complete data table
- Download Excel button
- Refresh data button

## File Structure After Installation

```
ConPro/
├── server/
│   ├── node_modules/        # Backend dependencies (created after install)
│   ├── server.js            # Backend API server
│   ├── package.json         # Backend configuration
│   └── user_data.xlsx       # Excel file (auto-created on first submission)
│
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── ChatAgent.js        # Chat interface component
│   │       ├── ChatAgent.css       # Chat styling
│   │       ├── AdminDashboard.js   # Admin dashboard component
│   │       └── AdminDashboard.css  # Dashboard styling
│   └── pages/
│       ├── ChatAgentPage.js        # Chat page wrapper
│       └── AdminPage.js            # Admin page wrapper
│
├── CHAT_AGENT_README.md            # Detailed documentation
└── start-chat-agent.bat            # Quick start script (Windows)
```

## Verifying Installation

### 1. Check Backend Server

Open: **http://localhost:5000/api/health**

You should see:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-12-20T..."
}
```

### 2. Check Frontend Application

The React app should automatically open. If not, manually navigate to:
**http://localhost:3000**

### 3. Test Chat Agent

1. Go to http://localhost:3000/chat-agent
2. Fill in the chat form step by step
3. Complete all fields
4. Check if Excel file is created in `server/user_data.xlsx`

### 4. Test Admin Dashboard

1. Go to http://localhost:3000/admin
2. Verify that submitted data appears
3. Try downloading the Excel file

## Common Issues & Solutions

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Port 5000 already in use"
**Solution:** 
1. Stop the process using port 5000
2. Or change the port in `server/server.js`:
   ```javascript
   const PORT = process.env.PORT || 5001; // Change to 5001
   ```
3. Update the API URL in `ChatAgent.js` and `AdminDashboard.js`

### Issue: "CORS error" in browser console
**Solution:** 
- Ensure backend server is running
- Check that CORS is enabled in `server.js`
- Clear browser cache and reload

### Issue: Excel file not created
**Solution:**
- Check server logs for errors
- Verify write permissions in the `server` directory
- Ensure all form fields are filled before submitting

### Issue: Data not appearing in Admin Dashboard
**Solution:**
1. Check if backend server is running
2. Open browser DevTools (F12) → Network tab
3. Refresh admin page and check for failed requests
4. Verify Excel file exists with data

## Next Steps

### Adding More Form Fields

Edit `src/components/ui/ChatAgent.js` and add to the `adaptiveCards` array:

```javascript
{
  id: 'customField',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'Your custom question?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Text',
      id: 'customField',
      placeholder: 'Enter value',
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'customField' }
    }
  ]
}
```

Remember to update the Excel headers in `server/server.js`.

### Customizing Styles

- **Chat Interface**: Edit `src/components/ui/ChatAgent.css`
- **Admin Dashboard**: Edit `src/components/ui/AdminDashboard.css`
- **Colors**: Search for color values (e.g., `#667eea`) and replace

### Deploying to Production

1. **Backend**: Deploy to Heroku, AWS, or Azure
2. **Frontend**: Run `npm run build` then deploy to hosting service
3. **Update API URL**: Change backend URL in components from `localhost:5000` to production URL

## Support & Documentation

- **Full Documentation**: See `CHAT_AGENT_README.md`
- **Component Details**: Check inline comments in source files
- **API Endpoints**: Documented in `server/server.js`

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend application loads successfully
- [ ] Chat agent displays welcome message
- [ ] Can submit each form step
- [ ] Data saves to Excel file
- [ ] Admin dashboard displays data
- [ ] Can download Excel file
- [ ] Responsive design works on mobile

## Tips

💡 **Keep both terminals open** - One for backend, one for frontend

💡 **Use Chrome DevTools** - Press F12 to debug issues

💡 **Check server logs** - Watch the backend terminal for error messages

💡 **Excel file location** - The path is shown when backend server starts

💡 **Auto-reload** - Frontend auto-reloads on code changes (React hot reload)

💡 **Backend auto-reload** - Using `npm run dev` enables nodemon auto-reload

---

**Ready to go!** 🎉

Your Chat Agent is now set up and ready to collect user data. Access it at:
- **User Interface**: http://localhost:3000/chat-agent
- **Admin Dashboard**: http://localhost:3000/admin

For detailed information about features and customization, refer to `CHAT_AGENT_README.md`.
