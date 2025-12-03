import Event from "../models/event.js";

export const searchEvents = async (req, res) => {
    try {
        const { keyword, startDate, endDate, location, role} = req.query;

        const userId = req.user.userId;

        const filters = {keyword,startDate,endDate,location,
            userId: role ? userId : undefined
            ,role};

        const events = await Event.searchEvents(filters);

        return res.json({
            count: events.length,
            events});

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};