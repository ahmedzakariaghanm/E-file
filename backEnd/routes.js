var express              = require('express'),
    routes               = express.Router();
    contacts             = require('./controllers/contactsController')
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

routes.get('/getContacts',contacts.getContacts)
routes.post('/addContact',contacts.addContact)
routes.delete('/deleteContact/:id',contacts.deleteContact)
routes.post('/editContact',contacts.editContact) 

module.exports = routes;