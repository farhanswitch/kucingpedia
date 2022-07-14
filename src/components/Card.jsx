const Card = ({ data }) => {
  return (
    <div className="card px-8 py-6 mt-10 border shadow">
      <div className="utama flex gap-4">
        <div className="kiri w-[450px] h-[270px] px-4 ">
          <img
            src={data["image"].url}
            alt={data.name}
            width={450}
            className="object-cover object-center max-h-[250px]"
          />
        </div>
        <div className="kanan w-2/3">
          <h2 className="mb-4 text-lg text-blue-800">{data.name}</h2>
          <p className="text-slate-800">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
