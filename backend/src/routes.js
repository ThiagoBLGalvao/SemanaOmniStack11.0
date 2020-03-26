
/**
 * Métodos HTTP:
 * GET: buscar/listar as informações no back-end
 * POST: cria uma informação no back-end
 * PUT: altera uma informação no back-end
 * DELET: deleta uma informação no back-end
 */
/**
 * Tipo de Parametros
 * 
 * 
 * Query Params: Parametros nomeados/enviados na rota após o simbolo "?" (Filtros, paginação) -Exemplo: http://localhost:3333/users?page=2&name=Thiago- 
 * Routes Params: Parametro usados para identificar recursos. Exemplo: http://localhost:3333/users/1- caso: app.get("/users/:id")
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos 
 * 
 */
const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const connection = require('./database/connection');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);


module.exports = routes;