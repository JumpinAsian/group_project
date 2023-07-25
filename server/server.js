const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const DB = "expenses";

app.use(express.json());
express.urlencoded({ extended: true });

app.use(cors());

require("./config/mongoose.config")(DB);

require("./routes/expenses.routes.js")(app);

app.listen(port, () => console.log(`Server is up and running on port ${port}`));