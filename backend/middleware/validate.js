```javascript
const { check, body, query, param } = require('express-validator');

const validate = {
  register: [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('apellido', 'El apellido es requerido').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty().isEmail(),
    check('password', 'La contraseña es requerida y debe tener al menos 8 caracteres').not().isEmpty().isLength({ min: 8 }),
  ],

  login: [
    check('email', 'El email es requerido').not().isEmpty().isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
  ],

  update: [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('apellido', 'El apellido es requerido').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty().isEmail(),
  ],

  id: [
    param('id', 'El id es requerido y debe ser un número').not().isEmpty().isNumeric(),
  ],
};

module.exports = validate;
```