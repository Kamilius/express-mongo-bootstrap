'use strict';

const express = require('express');
const router = express.Router();
const daoUser = require('../../dao/user');

/**
 * @api {get} /users.json GET users.json listing.
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {object[]} List of users.json.
 */
router.get('/', (req, res, next) => {
  return daoUser.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} user.firstname Firstname of the User.
 * @apiSuccess {String} user.lastname  Lastname of the User.
 */
router.get('/:id', (req, res, next) => {
  daoUser.findOne(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * @api {post} /user/:id Create User
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {object} user User Information
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/', (req, res, next) => {
  daoUser.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * @api {put} /user/:id Update User information
 * @apiName UpdateEntireUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {Number} user User (entire object)
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.put('/:id', (req, res, next) => {
  daoUser.update(req.params.id, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * @api {patch} /partial/:id Update User information
 * @apiName UpdatePartialUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {Number} user User (partial object)
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.patch('/:id', (req, res, next) => {
  daoUser.modify(req.params.id, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * @api {delete} /user/:id Delete User
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.delete('/:id', (req, res, next) => {
  daoUser.delete(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
