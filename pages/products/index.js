import Products from '../../components/Products';
import categories from '../../server/categories/index.get.json'
import products from '../../server/products/index.get.json'

function Product() {
  return <Products products={products} categories={categories} loggedInUser="mahak.gumber"/>
}
  
  export default Product

