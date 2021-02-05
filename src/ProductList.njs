import Nullstack from 'nullstack';

class ProductList extends Nullstack {

  products = [];

  static async readProducts({database}) {
    const [products] = await database.query('SELECT * FROM products');
    return products;
  }

  async initiate() {
    this.products = await this.readProducts();
  }

  static async deleteProduct({database, id}) {
    await database.query('DELETE FROM products WHERE id=?', [id]);
  }

  async delete({product}) {
    await this.deleteProduct({id: product.id});
    await this.initiate();
  }
  
  render() {
    return (
      <div class="container">
        <h1> Product List </h1>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th style="width:1px"></th>
              <th style="width:1px"></th>
            </tr>
          </thead>
          <tbody>
            {this.products.map((product) => (
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <button class="btn btn-sm btn-danger" onclick={this.delete} product={product}>
                    <i class="fas fa-trash" />
                  </button>    
                </td>
                <td>
                  <a href={`/products/${product.id}`} class="btn btn-sm btn-primary">
                    <i class="fas fa-edit" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="/products/new" class="btn btn-primary">Add Product</a>
      </div>
    )
  }

}

export default ProductList;