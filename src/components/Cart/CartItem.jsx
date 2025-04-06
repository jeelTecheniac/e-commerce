import { useDispatch } from "react-redux";
import { adjustQty, removeFromCart } from "../../redux/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (e) => {
    const newQty = parseInt(e.target.value);
    if (newQty > 0) {
      dispatch(adjustQty({ id: item.id, qty: newQty }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const incrementQty = () => {
    dispatch(adjustQty({ id: item.id, qty: item.qty + 1 }));
  };

  const decrementQty = () => {
    if (item.qty > 1) {
      dispatch(adjustQty({ id: item.id, qty: item.qty - 1 }));
    }
  };

  return (
    <div className="flex items-start sm:items-center py-4 border-b flex-col sm:flex-row">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
      />
      <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 flex-1 w-full">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-medium">{item.name}</h3>
            <p className="text-gray-600 text-sm">₹{item.price.toFixed(2)}</p>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 sm:ml-4"
          >
            Remove
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <label className="mr-2 text-sm sm:text-base">Qty:</label>
          <div className="flex items-center border rounded">
            <button
              onClick={decrementQty}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border-r"
              disabled={item.qty <= 1}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={handleQtyChange}
              className="w-12 px-2 py-1 text-center border-none focus:outline-none"
            />
            <button
              onClick={incrementQty}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border-l"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
