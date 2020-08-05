import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import { Modal } from '../Common';
import { ProductCardContent } from './ProductCardContent/ProductCardContent';
import './Products.scss';

const Products = (props) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState();
   const { products, actions, cartProducts } = props;
   const { fetchData } = actions;

   useEffect(() => {
      fetchData();
   }, [fetchData])

   const selectProduct = (id) => {
      const selectedProduct = products.find(p => p._id === id);
      setSelectedProduct(selectedProduct);
      setIsModalOpen(true);
   }

   const requestClose = () => {
      setSelectedProduct(null);
      setIsModalOpen(false);
   }

   const prods = [{"imageUrl":"https://vshop.blob.core.windows.net/uploads/Screenshot%202020-06-09%20at%2012.29.32.png","status":2,"mark":0,"currency":"usd","createdAt":"2020-06-25T20:53:40.602Z","_id":"5ef50efbda4855ad0b7be0aa","title":".../.asdfsadfsadfsa","description":"asdfasdf","amount":4,"gallery":[{"_id":"5ef50f43da8d2aad2b6e5b2a","name":"sky.jpeg","url":"https://vshop.blob.core.windows.net/uploads/sky.jpeg"},{"_id":"5ef5b67226c962bb60d0c2cb","name":"index.jpg","url":"https://vshop.blob.core.windows.net/uploads/index.jpg"}],"blobName":"Screenshot 2020-06-09 at 12.29.32.png","__v":0},{"imageUrl":"https://vshop.blob.core.windows.net/uploads/Screenshot%202020-06-17%20at%2011.42.43.png","status":0,"mark":0,"currency":"usd","createdAt":"2020-06-26T14:18:07.149Z","_id":"5ef605d8b9e0a8d7a9668631","title":"zip","description":"dron","amount":12,"gallery":[{"_id":"5ef605d8b9e0a8d7a9668632","name":"Screenshot 2020-06-09 at 10.18.05.png","url":"https://vshop.blob.core.windows.net/uploads/Screenshot%202020-06-09%20at%2010.18.05.png"}],"blobName":"Screenshot 2020-06-17 at 11.42.43.png","__v":0},{"imageUrl":"https://vshop.blob.core.windows.net/uploads/Screenshot%202020-06-17%20at%2012.51.34.png","status":0,"mark":0,"currency":"usd","createdAt":"2020-06-26T14:18:07.149Z","_id":"5ef6098ab9e0a8d7a9668633","title":"trololo","description":"aaa","amount":1,"blobName":"Screenshot 2020-06-17 at 12.51.34.png","gallery":[],"__v":0},{"imageUrl":"https://vshop.blob.core.windows.net/uploads/giphy.gif","status":0,"mark":0,"currency":"usd","createdAt":"2020-06-26T14:18:07.149Z","_id":"5ef6099db9e0a8d7a9668634","title":"deep","description":"asdfasdf","amount":4,"blobName":"giphy.gif","gallery":[],"__v":0},{"imageUrl":"https://vshop.blob.core.windows.net/uploads/nata.jpg","status":0,"mark":0,"currency":"usd","createdAt":"2020-06-26T14:18:07.149Z","_id":"5ef609abb9e0a8d7a9668635","title":"prom","description":"desc","amount":4,"blobName":"nata.jpg","gallery":[],"__v":0},{"imageUrl":"https://vshop.blob.core.windows.net/uploads/MicrosoftTeams-image%20(5).png","status":0,"mark":0,"currency":"usd","createdAt":"2020-06-26T14:18:07.149Z","_id":"5ef609c2b9e0a8d7a9668636","title":"man","description":"here","amount":51,"blobName":"MicrosoftTeams-image (5).png","gallery":[],"__v":0},{"imageUrl":"https://vshop.blob.core.windows.net/uploads/photo_2020-06-09_12-26-04.jpg","status":0,"mark":0,"currency":"usd","createdAt":"2020-06-26T14:18:07.149Z","_id":"5ef609f4b9e0a8d7a9668637","title":"title","description":"55","amount":124,"blobName":"photo_2020-06-09_12-26-04.jpg","gallery":[],"__v":0},{"imageUrl":"https://vshop.blob.core.windows.net/uploads/assets_favicon.ico","status":0,"mark":0,"currency":"usd","createdAt":"2020-08-04T16:21:43.332Z","_id":"5f298b4ea4fe26ee0d4f9184","title":"marked as 0","description":"asdasd","amount":55,"blobName":"assets_favicon.ico","gallery":[],"__v":0}];

   return (
      <div className="Products">
         <div className="Products__content">
            {prods.map((product, idx) => <ProductCard index={idx} key={product.title} product={product} actions={{ selectProduct, ...actions }} cartProducts={cartProducts} />)}
         </div>

         <Modal
            onClose={requestClose}
            isModalOpen={isModalOpen}
            header="view"
         >
            <ProductCardContent product={selectedProduct} actions={{...actions}} cartProducts={cartProducts} />
         </Modal>
      </div>
   )
}

export {
   Products
}
