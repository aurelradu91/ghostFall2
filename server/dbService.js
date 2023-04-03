import mysql from 'mysql';

import dotenv from 'dotenv';

let instance = null;

dotenv.config()


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});


connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log(`db ${connection.state}`)
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }
    async getAllData(){
        try{ const response = await new Promise((myResolve, reject) => {
            const query = "SELECT * FROM names";

            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                myResolve(results)
            })
        });
        return response;

        } catch (error){console.log(error)}
    }

    async insertNewName(name){
        try{const dateAdded = new Date();
            const score = "1";
            const insertId = await new Promise((myResolve, reject) => 
            {
            const query = "INSERT INTO names (name, score, date_added) VALUES (?,?,?);";

            connection.query(query, [name, score, dateAdded], (err, results) => {
                if (err) reject(new Error(err.message));
                myResolve(results)
            })
        });
            return {
                name : name,
                score: score,
                dateAdded : dateAdded};
            
        } catch (error) {
            console.log(error);
        }
    }
    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {

                const query = "SELECT * FROM names WHERE name LIKE ? ESCAPE '$';";

                

                connection.query(query, [`%$${name}%`], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

}



export {DbService};