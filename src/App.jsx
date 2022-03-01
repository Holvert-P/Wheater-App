import { useEffect, useState } from "react";
import ContainerLeft from "./components/ContainerLeft";
import ContainerRigth from "./components/ContainerRight";
import FormSearch from "./components/FormSearch";
import { helpHttp } from "./helpers/helpHttp";
const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [days, setDays] = useState([]);
  const [image, setImage] = useState([]);
  const [tempMin, setTempMin] = useState([]);
  const [tempMax, setTempMax] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [city, setCity] = useState({});
  const [list, setList] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  let url = "https://api.openweathermap.org/data/2.5/";
  useEffect(() => {
    handleLocation(url);
  }, [url]);

  const handleLocation = (url = "https://api.openweathermap.org/data/2.5/") => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (item) => {
          let { latitude, longitude } = item.coords,
            endpoint = `${url}forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=720ecc632ab33b0ac5e805778e388428`;
          helpHttp()
            .get(endpoint)
            .then((res) => {
              if (!res.err) {
                helpHttp()
                  .get(
                    `${url}weather?q=${res.city.name}&appid=720ecc632ab33b0ac5e805778e388428`
                  )
                  .then((res) => {
                    if (!res.err) {
                      setCurrentData(res);
                      setCurrentImage(res.weather[0].description);
                    } else {
                      setCurrentData(null);
                    }
                  });
                setCity(res.city);
                setList(res.list);
              }
            });
        },
        (e) => {
          alert(e.toString());
        },
        { enableHighAccuracy: false, maximumAge: 30000, timeout: 20000 }
      );
    } else {
      alert("no hay geolocalizacion en este dispositivo");
    }
  };

  const handleSubmit = (e, city) => {
    e.preventDefault();
    helpHttp()
      .get(`${url}weather?q=${city}&appid=720ecc632ab33b0ac5e805778e388428`)
      .then((res) => {
        if (!res.err) {
          setCurrentData(res);
          setCurrentImage(res.weather[0].description);
          request(
            `${url}forecast?lat=${res.coord.lat}&lon=${res.coord.lon}&units=metric&appid=720ecc632ab33b0ac5e805778e388428`
          );
        } else {
          setCurrentData(null);
        }
      });
  };

  const request = (url) => {
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setCity(res.city);
          setList(res.list);
        }
      });
  };

  useEffect(() => {
    let fecha = [],
      images = [],
      minTemps = [],
      maxTemps = [];
    for (let i = 0; i < list.length; i += 8) {
      fecha.push(new Date(list[i].dt_txt).toDateString().slice(0, 10));
      images.push(list[i].weather[0].description);
      minTemps.push(list[i].main.temp_min);
      maxTemps.push(list[i].main.temp_max);
    }
    setDays(fecha);
    setImage(images);
    setTempMax(maxTemps);
    setTempMin(minTemps);
  }, [list]);

  return (
    <main>
      {!isVisible && (
        <ContainerLeft
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          city={city}
          currentImage={currentImage}
          handleLocation={handleLocation}
        />
      )}
      {isVisible && (
        <FormSearch
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          handleSubmit={handleSubmit}
        />
      )}
      <ContainerRigth
        list={list}
        days={days}
        images={image}
        tempMin={tempMin}
        tempMax={tempMax}
        currentData={currentData}
      />
    </main>
  );
};

export default App;
