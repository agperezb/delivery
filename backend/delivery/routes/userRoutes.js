const userController =require('../controllers/userController');

module.exports=(app)=>{

    app.get('/api/users/getAll',userController.getAll);

    app.post('/api/users/create',userController.register);
    app.post('/api/users/login',userController.login);

};