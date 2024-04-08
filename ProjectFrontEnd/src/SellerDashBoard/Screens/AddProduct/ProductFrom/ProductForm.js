import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Cookies from "js-cookie";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stocks, setStocks] = useState("");
  const [images, setImages] = useState([]);
  const [category1, setCategory1] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/category/")
      .then((res) => {
        console.log(res.data.data);
        setCategory1(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (images.length + acceptedFiles.length > 5) {
        alert("Maximum of 5 images can be added.");
      } else {
        const newImages = [...images, ...acceptedFiles].slice(0, 5);
        setImages(newImages);
        console.log("Added images:", newImages);
      }
    },
    [images]
  );

  console.log("images 123: ", images);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDeleteImage = (index) => () => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    console.log("Remaining images:", updatedImages);
  };

  const isFormValid = () => {
    return (
      title && category && price && description && stocks && images.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic here
    // console.log("Form submitted with images:", images[0]);

    const data = new FormData();
    images.forEach((image, index) => {
      data.append(`image_url`, image);
      console.log(`image_url${index + 1}`, image);
    });

    data.append("title", title);
    data.append("category", category);
    data.append("description", description);
    data.append("price", parseFloat(price));
    data.append("stocks", parseInt(stocks));

    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    console.log("data :", data);

    try {
      const token = Cookies.get("seller_user");
      console.log("token : ", token);
      const res = await axios.post("http://localhost:4001/product/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      if (res.data.status === 200) {
        alert("Data saved successfully");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      // Handle error
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center w-full p-5">
      <div className="flex flex-col justify-center items-center gap-2.5 p-5 border-2 border-[rgba(110,89,75,1)] rounded bg-[#f9f9f9] w-full md:max-w-[40vw]">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="flex justify-center items-center border-2 border-dashed border-gray-400 w-full h-[40vh]"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop images here, or click to select images (max 5)</p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 mt-2.5 w-full min-h-[100px] max-h-[200px]">
          {images.map((file, index) => (
            <div
              key={index}
              className="w-full h-[100px] relative rounded overflow-hidden flex justify-center items-center shadow"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                className="w-full h-full object-contain"
              />
              <button
                onClick={handleDeleteImage(index)}
                className="absolute top-1.25 right-1.25 bg-red-500 text-white w-6 h-6 flex justify-center items-center rounded-full text-sm cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full mt-5 md:mt-0 md:max-w-[40%]"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="p-2.5 text-base border border-gray-300 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="p-2.5 text-base border border-gray-300 rounded"
        >
          <option value="">Select a category</option>
          {category1.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="p-2.5 text-base border border-gray-300 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="p-2.5 text-base border border-gray-300 rounded h-24"
        />
        <input
          type="number"
          value={stocks}
          onChange={(e) => setStocks(e.target.value)}
          placeholder="Stocks"
          required
          className="p-2.5 text-base border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={!isFormValid()}
          className="p-2.5 bg-[rgba(110,89,75,1)] text-white cursor-pointer rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
