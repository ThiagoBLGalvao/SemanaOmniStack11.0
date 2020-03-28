
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
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const connection = require('./database/connection');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentsController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })

}), IncidentsController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentsController.delete);


module.exports = routes;