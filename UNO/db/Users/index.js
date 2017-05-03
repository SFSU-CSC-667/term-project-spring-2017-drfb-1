const db = require( '../connect' )

const ALL = `SELECT * FROM Users`
const FIND = `SELECT * FROM Users WHERE id=$1`
const FIND_BY_ALIAS = `SELECT id, email FROM Users WHERE alias=$1`
const CREATE = `INSERT INTO Users ( first_name, last_name, alias, email, pw ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING id`
const DELETE = `DELETE FROM Users WHERE id = $1`

module.exports = {
   all: () => db.any( ALL ),
   find: id => db.oneOrNone( FIND, id ),
   find_by_alias: alias => db.oneOrNone( FIND_BY_ALIAS, alias ),
   create: ( first_name, last_name, alias, email, pw ) => db.oneOrNone( CREATE, [ first_name, last_name, alias, email, pw ] ),
   delete: id => db.none( DELETE, id ),
}