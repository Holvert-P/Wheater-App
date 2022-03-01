import { useState } from "react";
const FormSearch = ({
  setIsVisible,
  isVisible,
  handleSubmit,
  setBtnVisible,
}) => {
  const [city, setCity] = useState(null);
  return (
    <section className="form-search">
      <button className="btn-close" onClick={() => setIsVisible(!isVisible)}>
        X
      </button>
      <form>
        <div>
          <span className="material-icons">search</span>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search location"
            autoComplete="none"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          name="search-btn"
          id="search-btn"
          onClick={(e) => {
            handleSubmit(e, city);
            setIsVisible(!isVisible);
            setBtnVisible(true);
          }}
        />
      </form>
    </section>
  );
};

export default FormSearch;
