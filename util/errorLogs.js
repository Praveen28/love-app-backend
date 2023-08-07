const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..", "logs", "error_logs.txt");

const errorLogs = (error) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${error}\n\n`;

  fs.appendFile(filePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
};

module.exports = errorLogs;
