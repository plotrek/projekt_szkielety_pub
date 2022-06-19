conn = new Mongo();
db = conn.getDB("baza_projekt");

db.createUser(
{user: "user11",
pwd: "password",
 "roles" : [
{
        "role" : "readWrite",
        "db" : "baza_projekt"
}
]});

db.createCollection('users');

db.pokemons.createIndex({ "pokeName": 1 }, { unique: true });
db.pokemons.insert({"pokeName":"zubat","attack":130,"defense":200,"stamina":150});
db.pokemons.insert({"pokeName":"abra","attack":150,"defense":210,"stamina":100});
db.pokemons.insert({"pokeName":"ratata","attack":30,"defense":80,"stamina":50});

db.poke_moves.createIndex({ "moveName": 1 }, { unique: true });
db.poke_moves.insert({"type":"rock","moveName":"Stone Edge","power":100});
db.poke_moves.insert({"type":"water","moveName":"Hydro Cannon","power":90});
db.poke_moves.insert({"type":"grass","moveName":"Seed Bomb","power":50});





