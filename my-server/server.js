const { NodejsApplicationConfig } = require("./app");

new NodejsApplicationConfig(5000 , process.env.MONGO_URL)

