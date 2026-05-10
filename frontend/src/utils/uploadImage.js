import axios from "axios";

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

    const res = await axios.post(url, formData);
    if (res.data.success) {
        return res.data.data.url;
    } else {
        throw new Error("Image upload failed");
    }
};

export default uploadImage;