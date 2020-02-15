const app = require("./app");

// port
const PORT = process.env.PORT || 3002;

// listen
app.listen(PORT, () => {
  console.info(`Server running at ${PORT}`);
});
