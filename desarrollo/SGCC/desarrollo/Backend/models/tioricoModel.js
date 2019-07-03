const db = require('../models/database');

UserModel = {}

UserModel.userRegister = ( data ) => {
    return new Promise( (resolve, reject) => {
        db.sequelize.query('CALL sp_user_signin(?,?,?,?,?)',{
            raw: true,
            replacements: [
                data.userName,
                data.userPassword,
                data.userFirstName,
                data.userLastName,
                data.idHouse
            ]
        }).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        });
    })
}

UserModel.userLogin = ( data ) => {
    return new Promise( (resolve, reject) => {
        db.sequelize.query('CALL sp_user_login(?)',{
            raw: true,
            replacements: [
                data.userName
            ]
        }).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        });
    })
}

UserModel.postTransaction = (data) => {
    return new Promise( (resolve, reject) => {
        db.sequelize.query('CALL sp_insert_transaction(?,?,?,?,?,?,?,?)',{
            raw:true,
            replacements: [
                data.idUser,
                data.clientName,
                data.clientAddress,
                data.clientDocumentNumber,
                data.clientDocumentType,
                data.transactionType,
                data.quantity,
                data.precio_cambio
            ]
        }).then( result => {
            resolve(result)
        }).catch( err => {
            reject(err)
        })
    })
}

UserModel.getTransactions = (data) => {
    return new Promise( (resolve, reject) => {
        db.sequelize.query('CALL sp_select_transactions(?)',{
            raw:true,
            replacements: [
                data.idHouse
            ]
        }).then( result => {
            resolve(result)
        }).catch( err => {
            reject(err)
        })
    })
}
module.exports = UserModel