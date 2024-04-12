import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import OrderCard from '../../components/ordercard/OrderCard';
import Notifications from '../../components/notifications/Notifications';
import { statusSelector, msgSelector} from '../../store/cart/cartSlice';
import { loadOrders } from '../../store/orders/ordersSlice';

import './Orders.css';

function Orders() {
  const [valid, setValid] = useState(false);
  const status = useSelector(statusSelector);
  const msg = useSelector(msgSelector);
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order);

  useEffect(() => {
    async function load() {
      await dispatch(loadOrders());
    }
    load();
  }, [dispatch]);

  function timer(){
    if(msg === 'Product Added Successfully'){
      setValid(false);
    } else{
      setValid(true);
      setValid(true);
      setTimeout(()=>{
        setValid(false);
        setValid(false);
        setValid(false);
      }, 5000);
    }
  }

  useEffect(() => {
    timer()
  }, []);

  return (
    <section className="orders-page">
      <div className="orders-content-container">
        <Typography variant="h4">Your Orders</Typography>
        <Divider/>
        <Typography variant="h6">{Object.keys(orders).length || 0} orders</Typography>
        { orders && Object.keys(orders).length > 0 &&
          Object.keys(orders).map((key) => {
            const order = orders[key];
            return <OrderCard {...order} key={order.id} />
          })
        }
      </div>
      {(status && valid) && (<Notifications notMsg={msg}/>)}
    </section>
  );
}

export default Orders;
