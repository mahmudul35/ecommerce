import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AdminProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);
  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);
  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });
      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success("Product updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    const answer = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!answer) return;

    try {
      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} has been deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 xl:px-0">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Update / Delete Product
          </h2>

          {image && (
            <div className="text-center mb-6">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-[80%] h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="image"
              className="text-gray-700 font-medium py-2 px-4 bg-gray-200 rounded-lg cursor-pointer w-full text-center"
            >
              {image ? "Change Image" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-600"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full p-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-600"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  className="w-full p-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-600"
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="w-full p-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full p-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-600"
                >
                  Count in Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full p-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-600"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="w-full p-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  value={category}
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

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="py-3 px-8 rounded-lg bg-green-600 text-white text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-3 px-8 rounded-lg bg-red-600 text-white text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
