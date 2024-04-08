import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Cookies from "js-cookie";

const EditForm = ({ initialData, closeModal }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stocks, setStocks] = useState("");
  const [images, setImages] = useState([]);
  const [category1, setCategory1] = useState([]);

  useEffect(() => {
    setTitle(initialData.title || "");
    setCategory(initialData.category || "");
    setPrice(initialData.price || "");
    setDescription(initialData.description || "");
    setStocks(initialData.stocks || "");
    const preparedImages =
      initialData.images?.map((image) => ({
        preview: typeof image === "string" ? image : URL.createObjectURL(image),
      })) || [];

    console.log("preparedImages :", preparedImages);
    setImages(preparedImages);
  }, [initialData]);

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

  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     const filesWithPreview = acceptedFiles.map((file) => ({
  //       ...file,
  //       preview: URL.createObjectURL(file),
  //     }));
  //     if (images.length + filesWithPreview.length > 5) {
  //       alert("Maximum of 5 images can be added.");
  //       return;
  //     }
  //     const newImages = [...images, ...filesWithPreview].slice(0, 5);
  //     console.log("newImages  : ", newImages);
  //     setImages(newImages);
  //   },
  //   [images]
  // );

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

  console.log("images ayushi : ", images);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDeleteImage = useCallback(
    (index) => () => {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
    },
    [images]
  );

  useEffect(() => {
    return () =>
      images.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("images drashti : ", images);

    const data = new FormData();
    images.forEach((image, index) => {
      if (image instanceof File) {
        data.append(`image_url`, image);
      } else {
        data.append("image", image);
      }
    });
    data.append("title", title);
    data.append("category", category);
    data.append("description", description);
    data.append("price", parseFloat(price));
    data.append("stocks", parseInt(stocks));
    console.log("data : ", data);

    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    console.log("data : ", data);

    const token = Cookies.get("seller_user");
    console.log(token);

    const res = await axios.put(
      `http://localhost:4001/product/${initialData.id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    closeModal(); // Close the modal on successful submission
  };

  const isFormValid = () =>
    title && category && price && description && stocks && images.length > 0;

  return (
    <div className=" p-4 w-auto md:min-w-[40vw] ">
      <h1 className="text-center text-2xl font-bold text-[#6e594b] md:my-4">
        EDIT PRODUCT
      </h1>
      <div className="flex flex-wrap justify-center items-start gap-12">
        <div className="flex flex-col items-center gap-4 w-full lg:w-1/2 xl:w-2/5 p-4 border-2 border-[#6e594b] rounded-lg bg-[#f9f9f9]">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="w-full h-40 border-2 border-dashed border-gray-400 flex justify-center items-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="p-2">
              Drag 'n' drop images here, or click to select images (max 5)
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 w-full overflow-hidden">
            {images.map((file, index) => (
              <div
                key={index}
                className="relative w-full h-24 rounded overflow-hidden shadow"
              >
                <img
                  src={
                    file.preview
                      ? `http://localhost:4001/images/${file.preview}`
                      : URL.createObjectURL(file)
                  }
                  alt={`preview ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleDeleteImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full lg:w-1/2 xl:w-2/5"
        >
          <input
            className="p-2 text-lg border border-gray-300 rounded-md"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            // style={styles.input}
            className="p-2 text-lg border border-gray-300 rounded-md"
          >
            {!category ? (
              <option value="">Select a category</option>
            ) : (
              <option value={category}>{category}</option>
            )}
            {category1.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            className="p-2 text-lg border border-gray-300 rounded-md"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            className="p-2 text-lg border border-gray-300 rounded-md"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            className="p-2 text-lg border border-gray-300 rounded-md"
            type="number"
            placeholder="Stocks"
            value={stocks}
            onChange={(e) => setStocks(e.target.value)}
          />
          <button
            type="submit"
            disabled={!isFormValid()}
            className="p-2 mt-2 rounded-md bg-[#6e594b] text-white text-lg cursor-pointer hover:bg-[#59483d] transition-colors duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
