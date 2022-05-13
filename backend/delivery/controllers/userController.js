const User=require('../models/user');
const jwt=require('jsonwebtoken');
const key=require('../config/key');
const { token } = require('morgan');


module.exports={
    async getAll(req,res,next)
    {
        try {
            const data= await User.getAll();
            console.log(`Usuarios ${data}`);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json(
                {
                    success:false,
                    message:'Error al obtener los usuarios'
                }
            );
        }



    },
    async register(req,res,next){

        try {
            
            const user=req.body;
            const data =await User.create(user);
            return res.status(201).json({
                success:true,
                message:"El registro se realizo con Éxito",
                data:data.id
            });


        } catch (error) {
            console.log(`Error: ${error} `);
            return res.status(501).json({
                success:false,
                message:"Error al registrar el usuario",
                error:error
            });
        }

    },

    async login(req,res,next){

        try{
            const email=req.body.email;
            const password=req.body.password;

            const myUser= await User.findByEmail(email);

            if(!myUser){
                return req.status(401).json({
                    success:false,
                    message:'El usuario no fue encontrado'
                });
            }

            if(User.isPasswordMatched(password,myUser.password)){
                const token =jwt.sign({

                    id:myUser.id,
                    email:myUser.email
                },key.secretOrKey,{
                //    expiresIn:(60*60*24) 
                });
           


            const data ={
                id:myUser.id,
                name:myUser.name,
                lastname:myUser.lastname,
                email:myUser.email,
                phone:myUser.phone,
                image:myUser.image,
                session_token:`JWT ${token}`
            };
            return res.status(201).json({
                success:true,
                data:data
            });

 }else{

    return res.status(401).json({
        success:false,
        message:'La Contraseña es Incorrecta'
    });
 }
}catch(error){

    console.log(`Error: ${error}`);
    return res.status(501).json({
        success:false,
        message:'Error al momento de logueo',
        error:error
    });

}
    }



};