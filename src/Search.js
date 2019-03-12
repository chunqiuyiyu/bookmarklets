import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { dataContext, useDebounce } from './helper';

const Search = ({ origin }) => {
  const [, setData] = useContext(dataContext);
  const [str, setStr] = useState('');

  const navs = ['All'].concat(
    Array.from(new Set(origin.map(item => item.category))),
  );

  const debouncedSearchTerm = useDebounce(str, 100);

  useEffect(() => {
    setStr(debouncedSearchTerm);
    setData(
      origin.filter(item => {
        const dbItem = `${item.name} ${item.desc}`.toLowerCase();
        return dbItem.includes(debouncedSearchTerm);
      }),
    );
  }, [debouncedSearchTerm]);

  return (
    <div className="search">
      <input
        placeholder="/search..."
        value={str}
        onChange={e => setStr(e.target.value)}
      />
      <nav>
        Filter:
        {' '}
        {navs.map(item => (
          <a
            key={item}
            href="javascript:void(0)"
            onClick={() => setData(
              item === 'All'
                ? origin
                : origin.filter(tmp => tmp.category === item),
            )
            }
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
};

Search.propTypes = {
  origin: PropTypes.instanceOf(Array).isRequired,
};

export default Search;
