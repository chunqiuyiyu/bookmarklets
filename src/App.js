import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';

import '../node_modules/prismjs/themes/prism-solarizedlight.css';
import './App.css';

import Search from './Search';
import packageJson from '../package.json';
import { dataContext } from './helper';

const App = () => {
  const { Provider } = dataContext;
  const [data, setData] = useState([]);
  const [origin, setOrigin] = useState([]);

  useEffect(() => {
    fetch('data.json')
      .then(res => res.json())
      .then(info => {
        setData(info);
        setOrigin(info);
      });
  }, []);

  return (
    <Provider value={[data, setData]}>
      <div className="container">
        <header>
          <h1>Bookmarklets</h1>
          <div>{packageJson.description}</div>
        </header>
        <Search origin={origin} />
        <ul>
          {!data.length
            ? 'No Data'
            : data.map(item => (
              <li key={item.name}>
                <a href={`javascript:${item.code}`} className="name">
                  {item.name}
                </a>
                <details>
                  <summary className="desc">{item.desc}</summary>
                  <pre>
                    <code
                      className="language-javascript"
                      dangerouslySetInnerHTML={{
                        __html: Prism.highlight(
                          item.code,
                          Prism.languages.javascript,
                        ),
                      }}
                    />
                  </pre>
                </details>
              </li>
            ))}
        </ul>

        <footer>
          {`©${new Date().getFullYear()}. Built by `}
          <a href="https://www.chunqiuyiyu.com">chunqiuyiyu</a>
          {' with '}
          <a href="https://github.com/chunqiuyiyu/incipar">Incipar</a>
          {'.'}
        </footer>
      </div>
    </Provider>
  );
};

export default App;
export { dataContext };
