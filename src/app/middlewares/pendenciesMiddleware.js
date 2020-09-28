const pathRoute = require('@config/router.js')
    , PendingOperations = require('@models/pendingOperations')
module.exports = (req, res, next) => { 

    res.pendenciesMiddleware = function(data) {
      
        let url = req.baseUrl.replace(`${pathRoute.base}/` , '')
            , user = req._user
            , args = url.split('/')
            , isNotificationPeer = res.isNotificationPeer
            , entity = args[0].toLowerCase()
            , id = req.body != undefined ? req.body.Id : 'ID not mapped'
            , isMobileRequest = req.body.TypeMobile === true 

        if(!isMobileRequest && !isNotificationPeer) {

            let point =  `@${entity}/${req.method}`
        
            console.log(point)

            PendingOperations.findById(id)
                .then( e => {

                    if(e === null) {
                        PendingOperations.create({ _id : id , IdStudent : user.id, EntityName : entity , TypeOperation : req.method, DateEvent : new Date()})
                            .then( e => {
                                console.log('sucesso add pending', e)
                            })
                    } else {
                        PendingOperations.findByIdAndUpdate( id , { TypeOperation : req.method, DateEvent : new Date()} , { new: true })
                            .then( e => {
                                console.log('sucesso update pending', e)
                            })
                    }
                })
        }

        return res
    }

    next()
}