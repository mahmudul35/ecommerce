import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] bg-white">
      <div className="h-20"></div>
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg">
        <AdminMenu />
        <div className="md:w-3/4 p-8 bg-gray-50 rounded-lg">
          <div className="h-12 text-center text-2xl font-bold text-pink-600">
            Add New Product
          </div>

          {imageUrl && (
            <div className="text-center mb-6">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] border-2 border-gray-300 shadow-lg rounded-md"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 bg-pink-100 hover:bg-pink-200">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="p-3 space-y-6">
            <div className="flex flex-wrap space-x-10">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="text-lg font-semibold text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-200 text-black shadow-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="price"
                  className="text-lg font-semibold text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-200 text-black shadow-md"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap space-x-10">
              <div className="flex-1">
                <label
                  htmlFor="quantity"
                  className="text-lg font-semibold text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-200 text-black shadow-md"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="brand"
                  className="text-lg font-semibold text-gray-700"
                >
                  Brand
                </label>
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-200 text-black shadow-md"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label
              htmlFor="description"
              className="text-lg font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              type="text"
              className="p-4 mb-3 w-full border rounded-lg bg-gray-200 text-black shadow-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between space-x-10">
              <div className="flex-1">
                <label
                  htmlFor="stock"
                  className="text-lg font-semibold text-gray-700"
                >
                  Count In Stock
                </label>
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-200 text-black shadow-md"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="category"
                  className="text-lg font-semibold text-gray-700"
                >
                  Category
                </label>
                <select
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-200 text-black shadow-md"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 text-white hover:bg-pink-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
