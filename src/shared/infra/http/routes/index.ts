import { Router } from 'express';

const routes = Router();

routes.get('/test', (request, response) => {
  return response.json({ message: 'Hello World' });
});

routes.post('/test-post', (request, response) => {
  return response.json({ message: 'Hello NLW - POST' });
});

export default routes;
