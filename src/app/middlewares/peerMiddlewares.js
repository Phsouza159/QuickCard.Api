const pathRoute = require('@config/router.js')
    , { peerService , typeClient } = require('@peerServer/peerService')


module.exports = (req, res, next) => {


    res.peerMiddlerware = function(data) {
        
        let listeningEntity = ['deck', 'card', 'notepad', 'note']

        let url = req.baseUrl.replace(`${pathRoute.base}/` , '')
            , user = req._user
            , args = url.split('/')
            , entity = args[0].toLowerCase()
            , id = req.body != undefined ? req.body.Id : 'ID not mapped'
            , typeNotification = req.body.TypeMobile === true ? typeClient.WEB: typeClient.MOBILE

        if(listeningEntity.includes(entity)) {

            res.isNotificationPeer = peerService.notifaction( user.id, typeNotification , {
                point : `@${entity}/${req.method}`
                , message : `${req.method} operation on '${entity}' entity with '${id}' id tracking`
                , id 
                , entity 
            })
        }

        return res
    }

    next()
}