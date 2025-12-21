const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to Excel file
const EXCEL_FILE_PATH = path.join(__dirname, 'user_data.xlsx');

// Initialize Excel file if it doesn't exist
const initializeExcelFile = () => {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    const workbook = xlsx.utils.book_new();
    const worksheetData = [
      ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Position']
    ];
    const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
    
    // Set column widths
    worksheet['!cols'] = [
      { wch: 20 }, // Timestamp
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 25 }, // Company
      { wch: 20 }  // Position
    ];
    
    xlsx.utils.book_append_sheet(workbook, worksheet, 'User Data');
    xlsx.writeFile(workbook, EXCEL_FILE_PATH);
    console.log('Excel file initialized');
  }
};

// API endpoint to save data
app.post('/api/save-data', (req, res) => {
  try {
    const { name, email, phone, company, position, timestamp } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !company || !position) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Please provide all required information'
      });
    }

    // Read existing workbook
    let workbook;
    if (fs.existsSync(EXCEL_FILE_PATH)) {
      workbook = xlsx.readFile(EXCEL_FILE_PATH);
    } else {
      initializeExcelFile();
      workbook = xlsx.readFile(EXCEL_FILE_PATH);
    }

    const worksheet = workbook.Sheets['User Data'];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Format position for readability
    const positionMap = {
      'executive': 'Executive/C-Level',
      'manager': 'Manager',
      'developer': 'Developer',
      'designer': 'Designer',
      'hr': 'HR Professional',
      'other': 'Other'
    };

    // Add new row
    const newRow = [
      new Date(timestamp).toLocaleString(),
      name,
      email,
      phone,
      company,
      positionMap[position] || position
    ];

    data.push(newRow);

    // Convert back to worksheet
    const newWorksheet = xlsx.utils.aoa_to_sheet(data);
    
    // Set column widths
    newWorksheet['!cols'] = [
      { wch: 20 }, // Timestamp
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 25 }, // Company
      { wch: 20 }  // Position
    ];

    workbook.Sheets['User Data'] = newWorksheet;

    // Write to file
    xlsx.writeFile(workbook, EXCEL_FILE_PATH);

    console.log('Data saved successfully:', { name, email, company });

    res.status(200).json({ 
      success: true,
      message: 'Data saved successfully',
      rowNumber: data.length
    });

  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to save data to Excel file'
    });
  }
});

// API endpoint to get all data (for admin viewing)
app.get('/api/get-data', (req, res) => {
  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      return res.status(404).json({ 
        error: 'No data found',
        message: 'Excel file does not exist yet'
      });
    }

    const workbook = xlsx.readFile(EXCEL_FILE_PATH);
    const worksheet = workbook.Sheets['User Data'];
    const data = xlsx.utils.sheet_to_json(worksheet);

    res.status(200).json({ 
      success: true,
      count: data.length,
      data: data
    });

  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to read data from Excel file'
    });
  }
});

// API endpoint to download Excel file
app.get('/api/download-excel', (req, res) => {
  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      return res.status(404).json({ 
        error: 'No data found',
        message: 'Excel file does not exist yet'
      });
    }

    res.download(EXCEL_FILE_PATH, 'user_data.xlsx', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ 
          error: 'Download failed',
          message: 'Could not download Excel file'
        });
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to download Excel file'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Initialize Excel file on server start
initializeExcelFile();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Excel file location: ${EXCEL_FILE_PATH}`);
});

module.exports = app;
