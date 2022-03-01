import icon from "../assets/icon.json";
const ContainerLeft = ({
  setIsVisible,
  isVisible,
  city,
  currentImage,
  handleLocation,
}) => {
  let date = new Date().toDateString().slice(0, 10);

  return (
    <section className="left">
      <article className="left-header">
        <button
          className="btn-search"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          Search for places
        </button>
        <button className="btn-location" onClick={() => handleLocation()}>
          <span className="material-icons">my_location</span>
        </button>
      </article>
      <article className="left-body">
        {icon.map((item, index) =>
          item[currentImage] ? (
            <img src={item[currentImage]} alt={currentImage} key={index} />
          ) : (
            ""
          )
        )}

        <span className="temp">
          15 <span>ºC</span>
        </span>
        <p className="weather-state">Shower</p>
        <span className="date">Today • {date}</span>
        <span className="location">
          <span className="material-icons">location_on</span>
          {city.country}- {city.name}
        </span>
      </article>
    </section>
  );
};

export default ContainerLeft;
