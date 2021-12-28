const { check, validationResult} = require('express-validator');

exports.userSignupValidator = [

    check('name', 'Name is required').notEmpty(),
    check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        }),
    check('password', 'Password is required').notEmpty(),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
    (req, res, next) => {
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // return `${location}[${param}]: ${msg}`;
            return msg;
        };
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            const firstError = result.array()[0];
            return res.status(401).json({ error: firstError });
        }
        next();
    },
];
