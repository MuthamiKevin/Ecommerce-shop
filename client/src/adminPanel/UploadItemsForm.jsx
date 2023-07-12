import React, { useEffect, useState } from "react";

const UploadItemsForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image_url, setImage_url] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = { name, price, description, category, image_url };
    fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div>
        <h1>Admin Panel</h1>
      </div>
      <div className="w-72 px-5  rounded-md border bg-slate-900 my-2 py-2 text-white">
        <form className=" w-full " onSubmit={handleSubmit}>
          <label className=" block my-1" htmlFor="name">
            Product Name <br />
            <input
              onChange={(e) => setName(e.target.value)}
              className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
              type="text"
              id="name"
              placeholder="Enter product name"
              value={name}
              required
            />
          </label>
          <label className=" block my-1" htmlFor="price">
            Product Price <br />
            <input
              onChange={(e) => setPrice(e.target.value)}
              className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
              type="number"
              id="price"
              placeholder="Enter product price"
              value={price}
              required
            />
          </label>
          <label className=" block my-1" htmlFor="description">
            Product Description <br />
            <input
              onChange={(e) => setDescription(e.target.value)}
              className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
              type="text"
              id="description"
              placeholder="Enter product description"
              value={description}
              required
            />
          </label>
          <label className=" block my-1" htmlFor="category">
            Product Category <br />
            <input
              onChange={(e) => setCategory(e.target.value)}
              className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
              type="text"
              id="category"
              placeholder="Enter product Category"
              value={category}
              required
            />
          </label>
          <label className=" block my-1" htmlFor="image_url">
            Product Image <br />
            <input
              onChange={(e) => setImage_url(e.target.value)}
              className=" w-full h-8 outline-none bg-transparent border rounded-lg px-2 py-5"
              type="text"
              id="image_url"
              placeholder="Chose Product image"
              value={image_url}
              required
            />
          </label>
          <div className=" bg-red-600 text-center rounded-full mt-4 h-10">
            <button className=" h-full w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadItemsForm;
