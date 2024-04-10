import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { selectProductId, selectLoadingId, selectErrorId, fetchProductById} from '../../store/product/productSliceSpecific';
import {convertImageBufferToUrl, convertPostgreSQLTimestamp} from '../../apis/functions';
import CartButton from '../../features/addToCartBtn/AddBtn';
import './product.css';

export default function Product(){
    const products = useSelector(selectProductId);
    const loading = useSelector(selectLoadingId);
    const error = useSelector(selectErrorId);
    const [imageUrls, setImageUrls] = useState([]);

    const dispatch = useDispatch();
    /* image */
    useEffect(() => {
      const fetchImageUrls = async () => {
        if (products && Array.isArray(products.images)) {
          const urls = await await convertImageBufferToUrl(products.images);
          setImageUrls(urls);
          };
      };
      fetchImageUrls();
    }, [products]);

    /* product */
    const {id} = useParams();
    useEffect(() => {
      dispatch(fetchProductById(id));
    }, [id, dispatch]);

    /* VAR */
    return(
        <div>
            {loading && (
                <ul style={{width: '100%', textAlign:'center'}} class="wave-menu">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                </ul>
            )}
            {error && <p style={{width: '100%', textAlign:'center'}}>Error: {error}</p>}
            {products && (
                <div id='productComponent'>
                    <div className='imgContainerProduct'>
                        <img src={imageUrls} alt={products.name}/>
                    </div>
                    <div id='productInfo'>
                        <h2>{products.name}</h2>
                        <p className='price'>{products.price} USD</p>
                        <p className='description'>{products.description}</p>
                        <div className='center'>
                            <CartButton product={products}/>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}