import Products from '../../components/Products';
import products from '../../server/products/index.get.json';
import {useRouter} from "next/router";
import categories from '../../server/categories/index.get.json'



function ProductItem() {
    const { query } = useRouter();
   const filteredProducts=products.filter((product)=>{
    if(product.category==query.id){
        console.log({product,query})
        return product;

    }
   });

    return (
    <Products products={filteredProducts}  categories={categories} loggedInUser="mahak.gumber"/>
    );
 }
 
 export default ProductItem;