const configDB = {}

configDB.PORT = process.env.PORT || 3000

configDB.host = 'localhost'
configDB.port = 5432
configDB.name = 'Uno'
configDB.user = 'postgres'
configDB.pw = 'DRFB_S17'
configDB.img_dir = __dirname + '/../public/images/UnoCard'

module.exports = configDB