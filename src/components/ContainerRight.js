import CardTime from "./CardTime";

const ContainerRigth = ({ days, images, tempMin, tempMax, currentData }) => {
  return (
    <section className="right">
      <section className="times-days">
        {days.map((item, index) => (
          <CardTime
            days={item}
            key={index}
            images={images[index]}
            tempMax={tempMax[index]}
            tempMin={tempMin[index]}
          />
        ))}
      </section>
      <section>
        <h2>Today's Hightlights</h2>
        <div className="card-info">
          <article>
            <h3>Wind status</h3>
            <p>
              <span className="info-number">
                {currentData !== null ? Math.round(currentData.wind.speed) : ""}
              </span>
              mph
            </p>
            <span>
              <span className="material-icons">play_circle</span> wsw
            </span>
          </article>
          <article>
            <h3>Humidity</h3>
            <p>
              <span className="info-number">
                {currentData !== null ? currentData.main.humidity : ""}
              </span>
              %
            </p>
          </article>
          <article>
            <h3>Visibility</h3>
            <p>
              <span className="info-number">
                {currentData !== null ? currentData.visibility : ""}
              </span>
              meter
            </p>
          </article>
          <article>
            <h3>Air Pressure</h3>
            <p>
              <span className="info-number">
                {currentData !== null ? currentData.main.pressure : ""}
              </span>
              mb
            </p>
          </article>
        </div>
      </section>

      <footer>
        <small>created by HolvertP - devChallenges.io</small>
      </footer>
    </section>
  );
};

export default ContainerRigth;
