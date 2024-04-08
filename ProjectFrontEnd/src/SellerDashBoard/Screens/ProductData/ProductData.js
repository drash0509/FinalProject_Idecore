// Import React and other necessary components
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ProductDataCard from "./ProductDataCard";
import items from "../../../CustomerDashboard/items";
import EditForm from "./EditForm";
import axios from "axios";
import Cookies from "js-cookie";

Modal.setAppElement("#root");

const modalCustomStyles = {
  content: {
    //   top: '50%',
    //   left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //  transform: 'translate(-50%, -50%)',
    //   padding: '20px',
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "50", // Ensure this matches or exceeds your Tailwind config's zIndex settings
    display: "flex", // Enable Flexbox
    alignItems: "center", // Center vertically
    justifyContent: "center",
  },
};

const ProductData = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    imageFile: null,
  });
  const [data, setData] = useState([]);

  const token = Cookies.get("seller_user");
  console.log(token);

  useEffect(() => {
    axios
      .get("http://localhost:4001/seller_product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        console.log(data);
      });
  }, []);

  const handleEdit = async (product) => {
    setModalIsOpen(true);

    const res = await axios.get(
      `http://localhost:4001/category/${product.categoryId}`
    );
    console.log("res.data category : ", res.data.data.name);
    // await setCategory(res.data.data.name);
    const category1 = res.data.data.name;
    console.log("category1 : ", category1);

    console.log("product : ", product.image_url);

    const initialData = {
      id: product._id,
      title: product.title,
      category: category1, // Adjust according to your data structure
      price: product.price,
      description: product.description, // Assuming you have this data
      stocks: product.stocks, // Assuming you have this data
      images: product.image_url.map((url) => url), // Adjust this if your structure is different
    };

    console.log("initialData : ", initialData);
    setEditedProduct(initialData);
  };

  const handleDelete = async (product) => {
    console.log("Delete product", product);
    const res = await axios.delete(
      `http://localhost:4001/product/${product._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);

    const res1 = await axios.get("http://localhost:4001/seller_product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("res.data.data : ", res1.data.data);
    setData(res1.data.data);
    console.log("data : ", data);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-wrap justify-center gap-8 mb-24 w-full max-w-4xl p-8">
        {
          /* {items
          .flatMap((item) =>
            item.categories.flatMap((category) => category.products)
          ) */
          data.map((product) => (
            <ProductDataCard
              key={product._id}
              image={product.image_url[0]}
              title={product.title}
              price={product.price}
              stock={"N/A"}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product)}
            />
          ))
        }
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalCustomStyles}
        contentLabel="Edit Product Modal"
        className="outline-none focus:outline-none"
      >
        <div
          className="flex flex-col md:h-[80vh] h-[90vh] items-center justify-self-center overflow-auto mx-8 my-5 md:w-[50vw]  rounded-lg shadow border bg-[#ffffff] z-50"
          style={{
            border: "1px solid rgba(110,89,75,0.4)",
            borderRadius: "1vw",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <EditForm initialData={editedProduct} closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default ProductData;
