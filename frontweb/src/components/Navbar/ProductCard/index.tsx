import './styles.css';

import ProductImg from 'assets/images/product.png';
import ProductPrice from '../../ProductPrice';

const ProductCard = () => {
  return (
    <div className="base-card product-card">
      <div className="card-top-container">
        <img src={ProductImg} alt="nome do porduto" />
      </div>
      <div className="card-botton-container"> 
        <h6>Nome do porduto</h6>
        <ProductPrice />
      </div>
    </div>
  );
};

export default ProductCard;
