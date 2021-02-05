import Nullstack from 'nullstack';
import mysql from 'mysql2/promise';

import './Application.scss';

import ProductList from './ProductList';
import ProductForm from './ProductForm';

class Application extends Nullstack {

  static async start(context) {
    const {project} = context;
    project.name = 'Curious Crud';
    project.domain = 'nullstack.app';
    project.color = '#D22365';

    const database = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'saitama',
    });

    await database.query(`CREATE DATABASE IF NOT EXISTS ecommerce`);
    await database.query(`USE ecommerce`);
    await database.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(254), 
        price DECIMAL(10,2), 
        PRIMARY KEY (id)
      )
    `);

    context.database = database;
  }

  prepare({project, page}) {
    page.title = `${project.name} - Welcome to Nullstack!`;
    page.locale = 'pt-BR';
  }

  render() {
    return (
      <main>
        <head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" 
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet" 
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossorigin="anonymous"
          />
        </head>
        <ProductList route="/products" />
        <ProductForm route="/products/:id" />
      </main>
    )
  }

}

export default Application;