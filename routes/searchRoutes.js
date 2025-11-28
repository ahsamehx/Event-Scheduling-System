import { Router } from "express";
import { searchEvents } from "../controllers/searchController.js";
import authorize from "../Middlewares/auth.js";

const SearchRouter = Router();

SearchRouter.get("/events", authorize, searchEvents);

export default SearchRouter;