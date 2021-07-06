import './App.css';
import { useState } from 'react'
import { Input, Spin, List, Card } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = (value) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/albums/${value}/photos`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .then(setLoading(false));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Search
          className="search-bar"
          type="number"
          placeholder="Input Album ID (E.g: 1)"
          enterButton="Get Album Photos By Id"
          size="large"
          onSearch={onSearch}
        />

        {loading ? <Spin /> :
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card title={item.title}>
                  <img alt="item" src={item.thumbnailUrl}></img>
                </Card>
              </List.Item>
            )}
          />}
      </header>
    </div>
  );
}

export default App;
