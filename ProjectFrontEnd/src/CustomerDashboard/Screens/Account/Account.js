// Account.js
import React from 'react';
import profile from '../../images/profile.png' 
import OrderCard from '../../components/Ordercard';

function Account() {
  const orderItems = [
    {
      id: 1,
      item: { title: 'Product 1', price: 10, quantity: 2 }, 
      image_url: 'Products/Homedecore/Chair/chair3.png', 
      deliverydate:'12-04-2024'
    },
    {
      id: 2,
      item: { title: 'Product 2', price: 20, quantity: 1 }, // Example item data
      image_url: 'Products/Homedecore/Chair/chair3.png', // Example image URL
      deliverydate:'12-04-2024'
    },
    {
      id: 3,
      item: { title: 'Product 3', price: 20, quantity: 1 }, // Example item data
      image_url: 'Products/Homedecore/Chair/chair3.png', // Example image URL
      deliverydate:'11-04-2024'
    },
  ];

  // Group order items by delivery date
  const groupedItems = orderItems.reduce((acc, currentItem) => {
    if (!acc[currentItem.deliverydate]) {
      acc[currentItem.deliverydate] = [];
    }
    acc[currentItem.deliverydate].push(currentItem);
    return acc;
  }, {});

  return (
    <>
      <div className='flex flex-row overflow-x-hidden w-screen p-4'>
        <div className=' flex flex-row justify-center  align-middle gap-5 w-2/3 p-4'>
          <div className="border-2 rounded-full mx-2 p-4 border-custom-beige">
            <img src={profile} alt="" className=" h-10 w-10 object-contain" />
          </div>
          <div className="flex  self-center  flex-col">
            <p className="text-custom-brown text-2xl font-bold">AYUSHI DINESHBHAI AKBARI</p>
            <p className="text-custom-brown text-base font-thin">akbariayushi22@gmail.com</p>
          </div>
        </div>
        <div className=" w-1/3 flex items-center p-5 justify-around">
          <button className='w-2/5 bg-custom-brown hover:bg-transparent border-2 hover:border-custom-brown-dark hover:text-custom-brown-dark p-3 font-bold text-white rounded-lg'>DELETE ACCOUNT</button>
          <button className='w-2/5 bg-custom-brown hover:bg-transparent border-2 hover:border-custom-brown-dark hover:text-custom-brown-dark p-3 text-white font-bold rounded-lg'>LOGOUT</button>
        </div>
      </div>
      <div className='w-screen p-4 px-10 mt-5 align-middle items-center  justify-center'>
        <header className='text-custom-brown text-3xl font-extrabold'>
          YOUR ORDERS :
        </header>
        {Object.entries(groupedItems).map(([deliveryDate, items]) => (
          <div key={deliveryDate} className="border-b-2 justify-center align-middle mb-4 pb-4">
            <p className="text-custom-brown text-xl font-bold mt-4">{deliveryDate}</p>
            {items.map((orderItem) => (
              <OrderCard
                key={orderItem.id}
                id={orderItem.id}
                item={orderItem.item}
                image_url={orderItem.image_url}
                title={orderItem.item.title}
                price={orderItem.item.price}
                quantity={orderItem.item.quantity}
                deliverydate={orderItem.deliverydate}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Account;
