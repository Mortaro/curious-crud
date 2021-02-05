import Nullstack from 'nullstack';

class ProductForm extends Nullstack {

  name = '';
  price = 0;

  static async readProductById({database, id}) {
    const [products] = await database.query('SELECT * FROM products WHERE id=? LIMIT 1', [id]);
    return products[0];
  }

  async initiate({params}) {
    if(params.id !== 'new') {
      const product = await this.readProductById({id: params.id});
      this.name = product.name;
      this.price = product.price;
    }
  }

  static async createProduct({database, name, price}) {
    await database.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
  }

  static async updateProduct({database, name, price, id}) {
    await database.query('UPDATE products SET name=?, price=? WHERE id=?', [name, price, id]);
  }

  async submit({router, params}) {
    if(params.id === 'new') {
      await this.createProduct({
        name: this.name,
        price: this.price
      });
    } else {
      await this.updateProduct({
        id: params.id,
        name: this.name,
        price: this.price
      });
    }
    router.url = '/products';
  }
  
  render() {
    return (
      <div class="container">
        <h1> Product Form </h1>
        <form onsubmit={this.submit}>
          <div class="mb-3">
            <label>Name</label>
            <input class="form-control" bind={this.name} />
          </div>
          <div class="mb-3">
            <label>Price</label>
            <input type="number" step=".01" class="form-control" bind={this.price} />
          </div>
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }

}

export default ProductForm;