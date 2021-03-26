/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.scss';
import { ParamsType } from './types';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
// import ProductPrice from 'core/components/ProductPrice';
import { makeRequest } from 'core/utils/request';
// import { Product } from 'core/types/Product';
// import ProductInfoLoader from '../Loaders/ProductInfoLoader';
// import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';

const MoviesDetails = () => {
     const { productId } = useParams<ParamsType>();
     //const [product, setProduct] = useState<Product>();
     const [isLoading, setIsLoading] = useState(false);

     // useEffect(() => {
     //      setIsLoading(true);
     //      makeRequest({ url: `/products/${productId}` })
     //           .then(response => setProduct(response.data))
     //           .finally(() => setIsLoading(false));
     // }, [productId]);

     return (
          <div className="product-details-container">
               {/* <div className="product-details card-base border-radius-20">
                    <Link to="/products" className="product-details-goback">
                         <ArrowIcon className="arrow-goback" />
                         <h1 className="text-goback">VOLTAR</h1>
                    </Link>
                    <div className="row">
                         <div className="col-6 pr-5">
                              {isLoading ? <ProductInfoLoader /> : (
                                   <>
                                        <div className="product-details-card text-center">
                                             <img src={product?.img_URL} alt={product?.name} className="product-details-img" />
                                        </div>
                                        <h1 className="product-details-name">{product?.name}</h1>
                                        {product?.price && <ProductPrice price={product?.price} />}
                                   </>
                              )}
                         </div>
                         <div className="col-6 product-details-card">
                              {isLoading ? <ProductDescriptionLoader /> : (
                                   <>
                                        <h1 className="product-description-title">Descrição do Produto</h1>
                                        <p className="product-description-text">
                                             {product?.description}
                                        </p>
                                   </>
                              )}
                         </div>
                    </div>
               </div> */}
          </div>
     );
};

export default MoviesDetails;