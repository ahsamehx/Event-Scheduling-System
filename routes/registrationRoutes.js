import {Router} from 'express';
import{
    respondToEvent,
    getEventRegistrations,
    getUserRegistrations,
    deleteRegistration
}from "../controllers/registrationController.js";
import authorize from "../Middlewares/auth.js";
const RegistrationRouter = Router();

RegistrationRouter.post('/:eventId/respond', authorize, respondToEvent);

RegistrationRouter.get('/event/:eventId/get-registrations', authorize, getEventRegistrations);
 
RegistrationRouter.get('/users/get-registrations', authorize, getUserRegistrations);

RegistrationRouter.delete('/event/:eventId/delete-registration', authorize, deleteRegistration);

export default RegistrationRouter;