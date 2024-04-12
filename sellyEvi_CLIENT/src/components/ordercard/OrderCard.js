import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import Moment from 'react-moment';
import { loadOrder} from '../../store/orders/ordersSlice';
import './OrderCard.css';

const OrderCard = (props) => {
  const navigate = useNavigate();
  const { created, id, total, status } = props;
  const dispatch = useDispatch();
  async function fetchOrder(){
    await dispatch(loadOrder(id));
    navigate(`/orders/${id}`);
  }

  return (
    <div className="order-card-container">
      <div className='order-card-container-row1'> 
        <div className='order-card-container-name'>
          <i className="fas fa fa-shopping-cart fa-fw" ></i>
          <h3>{`Order # ${id}`}</h3>
        </div>
        <div className='moreDetails'>
          <button onClick={fetchOrder}>More Details</button>
        </div>
      </div>
      <div className='order-card-container-row2'>
      <table className='custom-table'>
        <th>Status</th>
        <th>Date</th>
        <th>Total</th>
        <tr>
            <td>{status}</td>
            <td><Moment format="LL">{created}</Moment></td>
            <td>{`$${total}`}</td>
        </tr>
      </table>
      </div>
    </div>
  )
}

export default OrderCard;