import Home from '../components/Home';
import categories from '../server/categories/index.get.json';
import banners from '../server/banners/index.get.json';

function Index() {
  return  <Home categories={categories} banners={banners}/>
}
  
  export default Index