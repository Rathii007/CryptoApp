const express = require("express");
const corsAnywhere = require("cors-anywhere");

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(corsAnywhere());

app.listen(PORT, () => {
  console.log(`CORS Anywhere server is running on http://localhost:${PORT}`);
});
