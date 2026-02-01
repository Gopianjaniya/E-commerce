import { UploadCloud } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Man");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const images = [image1, image2, image3, image4];

      for (let img of images) {
        if (img && img.size > 2 * 1024 * 1024) {
          toast.error("Image size 2MB se zyada hai");
          return;
        }
      }
      // ----- FormData is a javascript build-in-object(strore value key-value pair)
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start  w-full gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <div className="flex justify-center items-center">
            <label htmlFor="image1">
              {!image1 ? (
                <div className="flex flex-col justify-center items-center border border-dashed  w-20 h-20">
                  <UploadCloud />
                  <p className=" ">Upload</p>
                </div>
              ) : (
                <img className="w-20 h-20" src={URL.createObjectURL(image1)} />
              )}

              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="   flex justify-center items-center">
            <label htmlFor="image2">
              {!image2 ? (
                <div className="flex flex-col justify-center items-center border border-dashed  w-20 h-20">
                  <UploadCloud />
                  <p className=" ">Upload</p>
                </div>
              ) : (
                <img className="w-20 h-20" src={URL.createObjectURL(image2)} />
              )}
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="    flex justify-center items-center">
            <label htmlFor="image3">
              {!image3 ? (
                <div className="flex flex-col justify-center items-center border border-dashed  w-20 h-20">
                  <UploadCloud />
                  <p className=" ">Upload</p>
                </div>
              ) : (
                <img className="w-20 h-20" src={URL.createObjectURL(image3)} />
              )}
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="   flex justify-center items-center">
            <label htmlFor="image4">
              {!image4 ? (
                <div className="flex flex-col justify-center items-center border border-dashed  w-20 h-20">
                  <UploadCloud />
                  <p className=" ">Upload</p>
                </div>
              ) : (
                <img className="w-20 h-20" src={URL.createObjectURL(image4)} />
              )}
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-125 px-3 py-2 "
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-125 px-3 py-2 "
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full">
        <div>
          <p className="mb-2">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 "
          >
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub-Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2  "
          >
            <option value="Topwear">Topwear</option>
            <option value="Bootonwear">Bootonwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-30"
            type="number"
            placeholder="000"
            min={0}
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Produts sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"],
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S{" "}
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"],
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M{" "}
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"],
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L{" "}
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"],
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL{" "}
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"],
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller">Add To bestseller</label>
      </div>
      <button type="submit" className="w-28 bg-black text-white py-3 mt-3">
        ADD
      </button>
    </form>
  );
}
