const app = require("./app");
let PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log("App run port: ", PORT);
});
