const express=require("express")
const {protect,adminonly,agentOnly}=require('../Middleware/authMiddleware');
const { CreateTicket, GetTickets, GetTicketById, replyTicket, assignTicket, } = require("../Controller/TicketController");


const router = express.Router();

router.post("/", protect, CreateTicket);
router.get("/", protect, adminonly, GetTickets);
router.get("/:id", protect, GetTicketById);
router.post("/:id/reply", protect, agentOnly, replyTicket);
// Admin/Agent assign ticket
 router.post("/:id/assign", protect, adminonly, assignTicket);



module.exports = router;
