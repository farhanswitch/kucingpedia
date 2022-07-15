//import node modules
import { useState } from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import {
  AiFillCloseSquare,
  AiFillStar,
  AiOutlineStar,
  AiOutlineArrowRight,
} from "react-icons/ai";
import axios from "axios";
//import local modules
import { key } from "../utilities/key";

const Card = ({ data, refImg = null }) => {
  //deklarasi states
  const [isOpen, setIsOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  //data untuk bagian detail kucing
  const ratings = [
    { title: "Adaptability", element: "adaptability" },
    { title: "Affection Level", element: "affection_level" },
    { title: "Child Friendly", element: "child_friendly" },
    { title: "Dog Friendly", element: "dog_friendly" },
    { title: "Energy Level", element: "energy_level" },
    { title: "Grooming", element: "grooming" },
    { title: "Health Issues", element: "health_issues" },
    { title: "Intelligence", element: "intelligence" },
    { title: "Shedding Level", element: "shedding_level" },
    { title: "Social Needs", element: "social_needs" },
    { title: "Stranger Friendly", element: "stranger_friendly" },
    { title: "Vocalisation", element: "vocalisation" },
  ];

  //ambil data url gambar kucing yang bersangkutan
  const getImageURL = async (id) => {
    await axios({
      method: "GET",
      url: `https://api.thecatapi.com/v1/images/${id}`,
      headers: { "x-api-key": key },
    }).then((response) => {
      setImageURL(response.data.url);
    });
  };
  //kalau di data kucing yang didapat melalui props belum ada url ke gambar, maka akan dicari url ke gambar dengan cara fetch API ke endpoint /images/{images_id}
  if (refImg !== "" && refImg !== null) getImageURL(refImg);

  //fungsi untuk membuat bintang rating
  const makeStars = (starCount) => {
    let yellowStars = [];
    let emptyStars = [];
    for (let i = 0; i < starCount; i++) {
      yellowStars.push(i);
    }
    for (let i = 0; i < 5 - starCount; i++) {
      emptyStars.push(i);
    }

    return [yellowStars, emptyStars];
  };
  //fungsi untuk membuat bagian rating untuk setiap data
  const createRatingSection = (title, element) => {
    return (
      <div className={`${data[element] ? "block" : "hidden"}`}>
        <h4 className="mb-2 text-lg">{title}</h4>
        <div className="flex gap-2">
          {makeStars(data[element])[0].map((star) => (
            <span key={star} className="text-yellow-600">
              <AiFillStar />
            </span>
          ))}
          {makeStars(data[element])[1].map((star) => (
            <span key={star}>
              <AiOutlineStar />
            </span>
          ))}
        </div>
      </div>
    );
  };

  //tentukan url gambar kucing
  let url = "";
  //jika di data yang didapat melalui props sudah ada url gambar, maka gunakan url itu
  if (data["image"]) {
    url = data["image"].url;
  }
  //jika di state imageUrL sudah ada link, maka gunakan
  else if (imageURL !== "") {
    url = imageURL;
  }
  //beberapa ras kucing tidak tersedia gambar baik di data dari endpoint /breeds atau dari endpoint /images/

  return (
    <div className="card px-8 py-6 mt-10 border shadow w-[90%] mx-auto md:w-full">
      <div className="utama flex-column-reverse sm:flex-row gap-2 md:gap-4">
        <div className="kiri w-full md:w-1/3 h-[270px] px-0 md:px-4 mx-auto ">
          <img
            src={url}
            alt={data.name}
            className="object-cover object-center w-[60%] min-w-[80px] md:w-[450px] max-h-[250px] block mx-auto"
          />
        </div>
        <div className="kanan w-full md:w-2/3 mx-auto">
          <h2 className="mb-4 text-lg sm:text-2xl text-blue-800">
            {data.name}
          </h2>
          <p className="text-slate-800">{data.description}</p>
        </div>
      </div>
      <div className="details mt-4 py-4 bg-stone-100">
        <div className="title flex items-center justify-between px-2 sm:px-4">
          <h3 className="text-slate-700 text-lg">Detail</h3>
          <button
            className={`${
              isOpen ? "text-red-700" : "text-blue-700"
            } text-lg sm:text-xl md:text-3xl`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen ? <BsFillArrowDownSquareFill /> : <AiFillCloseSquare />}
          </button>
        </div>
        <div className={`other-info mt-4 px-4 ${isOpen ? "block" : "hidden"}`}>
          <h4 className={`mb-2 text-lg ${data.origin ? "block" : "hidden"}`}>
            Origin
          </h4>
          <p className="text-slate-600 mb-6">{data.origin}</p>
          <h4
            className={`mb-2 text-lg ${data.temperament ? "block" : "hidden"}`}
          >
            Temperament
          </h4>
          <p className="text-slate-600 mb-6">{data.temperament}</p>
          {ratings.map((rating, index) => (
            <div key={index}>
              {createRatingSection(rating.title, rating.element)}{" "}
            </div>
          ))}
          <a href={data.wikipedia_url}>
            <button className="px-4 flex gap-2 items-center text-blue-800 mt-9 py-2 border border-blue-600">
              Go to Wikipedia
              <span className="text-lg">
                <AiOutlineArrowRight />
              </span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
