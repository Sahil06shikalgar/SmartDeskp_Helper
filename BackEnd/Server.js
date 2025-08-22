    require('dotenv').config()
    const express=require('express')
    const cors=require("cors")
    const path = require("path");
    const connectDB = require('./Config/Db');


    const app = express();

     const authRoutes = require("./Routes/authRoute");
     const kbRoutes = require("./Routes/kbRoute.js");
     const ticketRoutes = require("./Routes/TicketRoute.js");
     const agentRoutes = require("./Routes/AgentRoute.js");
     const auditRoutes = require("./Routes/AuditRoute.js");
     const suggestionRoutes = require("./Routes/SuggestionRoute.js");
     const configRoutes = require("./Routes/ConfigRoute.js");
   
    


    

    app.use(
        cors({
            origin:process.env.CLIENT_URL || "*",
            methods:["GET,HEAD,PUT,PATCH,POST,DELETE"],
            allowedHeaders:["Content-Type", "Authorization"],
        })
    );

   ;

    //connect the Database
    connectDB();

    app.use(cors());
    app.use(express.json()); 
    

    //Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/kb", kbRoutes);
    app.use("/api/tickets", ticketRoutes);
    app.use("/api/agent", agentRoutes);
    app.use("/api/suggestion", suggestionRoutes);
    app.use("/api/config", configRoutes);
    app.use("/api/audit", auditRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });