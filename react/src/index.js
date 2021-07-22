import React from "react";
import ReactDOM from "react-dom";
import './style.css';

function App() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch('https://cn-east-1.baasapi.com/', {
      headers: {
        envid: 'yorhcDIFv2VLKyKE5YRa-', // 替换为你的环境ID
        keyid: 'frDo9pCfewCfBQ93otisA' // 替换为上面环境的密匙ID
      },
      method: 'POST',
      body: JSON.stringify({
        appId: 'qinglin-simple-blog', // 应用ID
        api: 'getManyPost', // 应用API
        version: 'v1', // API版本
        args: {} // API参数
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data.posts ? data.posts.data : []);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="container">
      {posts.length > 0 ? (
        posts.map((item, key) => (
          <div className="post" key={key}>
            <div className="postTitle">{item.title}</div>
            <div className="postTime">
              {new Date(item.createdAt).toLocaleString()}
            </div>
            <div className="postContent">{item.content}</div>
          </div>
        ))
      ) : (
        <div className="noContent">没有文章</div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
