import { useLocation, useNavigate } from "react-router-dom";
import  queryString  from "query-string";
import { useForm } from "../../hook/useForm"
import { HeroCard } from "../components/HeroCard"
import { getHeroByName } from "../helpers/getHeroByName";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search )
  const heroes = getHeroByName(q);

  const showSearch = (q.length === 0);
  const showError = (q.length > 0) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {

    event.preventDefault();
    // if( searchText.trim().length <= 1) return;

    navigate(`?q=${ searchText.toLocaleLowerCase().trim() }`)

  }

  
  return (
    <>
      <h1>Search</h1>
      <hr />
        <div className="row">
          <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form onSubmit={ onSearchSubmit } aria-label="form">
              <input 
                type="text" 
                placeholder="Search a hero"
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={ searchText }
                onChange={ onInputChange }
              />
              <button className="btn btn-outline-dark mt-1">
                Search
              </button>
            </form>
          </div>

          <div className="col-7">
            <h4>Results</h4>
            <hr />

            {/* {
              ( q === '' )
              ? <div className="alert alert-primary">Search a hero</div>
              : ( heroes.length === 0) && <div className="alert alert-danger">No hero with <b>{q}</b></div>
            } */}

            <div 
              aria-label="div"
              className="alert alert-primary animate__animated animate__fadIn" 
              style={{display: showSearch ? '' : 'none' }}>
                Search a hero
            </div>

            <div 
            aria-label="danger"
              className="alert alert-danger animate__animated animate__fadIn" 
              style={{display: showError ? '' : 'none'}}>
              No hero with <b>{q}</b>
            </div>
          
            {
              heroes.map( hero => (
                <HeroCard key={hero.id} {...hero}/>
              ))
            }

          </div>
        </div>
      
    </>
  )
}