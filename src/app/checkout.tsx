import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart } = useCart();

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <button>Place Order</button>
    </div>
  );
};

export default CheckoutPage;