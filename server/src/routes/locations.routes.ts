import { Router } from 'express';

import LocationsController from '../controllers/LocationsController';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const locationsRouter = Router();

locationsRouter.get('/', LocationsController.index);
locationsRouter.get('/:id', LocationsController.show);
locationsRouter.post('/', LocationsController.create);

export default locationsRouter;
