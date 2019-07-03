
const um = require('../models/tioricoModel'),
    bcrypt = require('bcrypt'),
    SALTROUNDS = 10,
    { validationResult } = require('express-validator/check'),
    https = require('https'),
    querystring = require('querystring'),
    axios = require('axios')

TioricoController = {}

TioricoController.register = (req,res) => {
    let user = {
        userName: req.body.userNick,
        userPassword: req.body.userPassword,
        userFirstName : req.body.userFirstName,
        userLastName: req.body.userLastName,
        idHouse: req.body.idHouse
    },
    errors = validationResult(req)
    
    return !errors.isEmpty()
        ?   res.status(422).json({ errors: errors.array() })
        :   bcrypt.genSalt(SALTROUNDS, (err,salt)=>{
            if (err) { return res
                .status(500)
                .send({
                    message: err.stack
                }) 
            }

            bcrypt.hash(user.userPassword, salt, (err, hash) => {
                user.userPassword = hash
       
                if (err) {
                    return res
                        .status(500)
                        .send({
                            message: err.stack
                        })
                }

                um.userRegister(user)
                    .then( data => {
                        console.log(data)
                        if (data[0]['response'] == -1) {
                            return res
                                .status(202)
                                .send({
                                    message: 'User already exist'
                                })
                        } else if (data[0]['response'] == 0) {
                            return res
                                .status(400)
                                .send({
                                    message: 'User created failed'
                                })
                        } else{
                            return res
                                .status(201)
                                .send({
                                    message: 'User created'
                                })
                        }
                    }).catch( error => {
                        return res
                            .status(500)
                            .send({
                                message: error.stack
                            })
                    })
                })
            })
}

TioricoController.save = ( req, res) => {
    let transaction = {
        idUser: req.body.idUser,
        clientName: req.body.clientName,
        clientAddress: req.body.clientAddress,
        clientDocumentNumber: req.body.clientDocumentNumber,
        clientDocumentType: req.body.clientDocumentType,
        transactionType: req.body.transactionType,
        quantity: req.body.quantity
    },
    errors = validationResult(req)

    console.log(transaction);
    
    return !errors.isEmpty()
    ?   res.status(422).json({ errors: errors.array() })
    :   axios.post('https://api.migoperu.pe/api/v1/exchange/latest', {
            token: 'dc9d7ad2-9590-439d-8c52-7fdeb9f7966c-7d78344e-befd-4ec0-b179-105dd59e6fef'
        })
        .then((response) => {
            console.log(`statusCode: ${response.status}`)
            console.log(response.data)
            if (response.status == 200) {
                let precio_compra = response.data.precio_compra
                let precio_venta = response.data.precio_venta
                let precio_cambio = 0
                switch (transaction.transactionType) {
                    case 'COMPRAR':
                        transaction.precio_cambio = precio_compra
                        
                        break;
                    case 'VENDER':
                        transaction.precio_cambio = precio_venta
                        break;
                }
                um.postTransaction( transaction )
                    .then( data => {
                        console.log(data)
                        if (data[0]['response'] == '0') {
                            return res
                                    .status(202)
                                    .send({
                                        message:'Algo salió mal'
                                    })
                        }
                        return res
                            .status(200)
                            .send({
                                message:'Transacción exitosa',
                                transactionOut: data
                            })
                    })
                    .catch(error => {
                        return res
                            .status(202)
                            .send({
                                message:'Algo salió mal',
                                error: error.stack
                            })
                    })
            }else {
                return res
                        .status(202)
                        .send({
                            message:'Algo salió mal'
                        })
            }
        })
        .catch((err) => {
            return res
                    .status(500)
                    .send({
                        message: err.stack
                    })
        })
}


TioricoController.getTransaction = (req, res) => {
    let data = {
        idHouse: req.query.idHouse
    }, errors = validationResult(req)

    return !errors.isEmpty()
    ?   res.status(422).json({ errors: errors.array() })
    :   UserModel.getTransactions(data)
            .then(data => {
                console.log(data)
                if( data.length == 0){
                    return res
                        .status(200)
                        .send({
                            data : []
                        })
                }
                return res
                    .status(200)
                    .send({
                        data : data
                    })
            })
            .catch(err => {
                return res
                    .status(500)
                    .send({
                        message: err.stack
                    })
            })
}

module.exports = TioricoController