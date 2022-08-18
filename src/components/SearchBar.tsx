import React from 'react';
import {setSearch} from "../store/slices/searchSlice";
import {useAppDispatch} from "../hook/useAppDispatch";
import {AiOutlineSearch} from "react-icons/ai";
import {IconContext} from "react-icons";


const SearchBar: React.FC = () => {

  const dispatch = useAppDispatch()

  return (
    <>
      <form action="" className='search-bar'>
        <div className='input-container'>
          <input
            type="text"
            name="search"
            autoComplete='off'
            placeholder='search...'
            onChange={event => dispatch(setSearch(event.target.value))}
          />
          <IconContext.Provider value={{color: 'black', size: '25px'}}>
            <AiOutlineSearch/>
          </IconContext.Provider>

        </div>

      </form>
    </>
  );
};

export default SearchBar;