import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import OrderItemCard from '../../components/orderItemCard/OrderItemCard';
import { loadOrder} from '../../store/orders/ordersSlice';

function OrderDetails() {
  const items = useSelector(state => state.order.undefined);
  const dispatch = useDispatch();
  const {orderId} = useParams();


  useEffect(() => {
    async function load() {
      await dispatch(loadOrder(orderId));
    }
    load();
  }, [dispatch, orderId]);
  
  function calculateTotal() {
    return items.reduce((accumulator, currentValue) => (Number(accumulator.price)*Number(accumulator.quantity)) + (Number(currentValue.price)*Number(currentValue.quantity)));
  };

    return (
      <section className="cart-details-container">
        <Link to='/orders' className='btnact' style={{textAlign: 'right'}}><p>Orders</p></Link>
        <p style={{fontSize: 40, color: 'black'}}>Order {orderId}</p>
        <div className="cart-info-container">
          {/* CART INFORMATION */}
          <table class="custom-table tableFinal" >
            <th>
              <Typography variant="h6">
                Product Details
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Quantity
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Price p/u
              </Typography>
            </th>
            <th>
              <Typography variant="h6">
                Total
              </Typography>
            </th>

            {
            items.map(item => {
              return (
                <OrderItemCard {...item} />
              )
            })
          }

      </table>
  
        </div>
        <div className="cart-summary-container">
          <div className="cart-summary-container-inner">
            <Divider className="checkout-divider"/>
            <div className="order-summary-container">
              <br/>
              <Typography variant="h6">
                Order Summary
              </Typography>
              <br/>
              <div className="order-line-item">
                {items.length === 1 && (<Typography>Subtotal: {items[0].price*items[0].quantity} USD</Typography>)}
                {items.length > 1 && (<Typography>Subtotal: {calculateTotal()} USD</Typography>)}
              </div>
              <div className="order-line-item">
                <Typography>Shipping: FREE</Typography>
              </div>
              <br/>
              <Divider className="checkout-divider"/>
              <br/>
              <div className="order-line-item">
                {items.length === 1 && (<Typography>Total: {items[0].price*items[0].quantity} USD</Typography>)}
                {items.length > 1 && (<Typography>Total: {calculateTotal()} USD</Typography>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default OrderDetails;
