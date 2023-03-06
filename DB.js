const { Client } = require('pg');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('fusepong_solutions_core_development', 'postgres', 'root', {
   host: 'localhost',
   dialect: 'postgres'
 });


 try {
   sequelize.authenticate();
   console.log('Connection has been established successfully to fuseaccess');
 } catch (error) {
   console.error('Unable to connect to the database:', error);
 }

 module.exports = sequelize; 

