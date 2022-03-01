import icon from "../assets/icon.json";
const CardTime = ({ days, images, tempMax, tempMin }) => {
  return (
    <article className="card-time">
      <figure>
        <figcaption>{days}</figcaption>
        {icon.map((item, index) =>
          item[images] ? (
            <img src={item[images]} alt={images} key={index} />
          ) : (
            ""
          )
        )}
      </figure>
      <div>
        <span> {Math.round(tempMax)} ºC</span>
        <span>{Math.floor(tempMin)} ºC</span>
      </div>
    </article>
  );
};

export default CardTime;
