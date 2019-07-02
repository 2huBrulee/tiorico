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
/// FIN JUAN
