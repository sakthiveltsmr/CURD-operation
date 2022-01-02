import axios from "axios";
import React from "react";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  getpost = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      this.setState({ posts: data });
      console.log(data);
    } catch (err) {
      console.log("invalid data", err);
    }
  };

  componentDidMount() {
    this.getpost();
  }
  render() {
    return (
      <>
        <table>
          <tr>
            <th>AlbumId</th>
            <th>Id</th>
            <th>Title</th>
            <th>Url</th>
            <th>Thumbnailurl</th>
          </tr>
          {this.state.posts.map((post) => {
            return (
              <tr>
                <td>{post.albumId} </td>
                <td>{post.Id} </td>
                <td>{post.title} </td>
                <td>{post.url} </td>
                <td>{post.thumbnailUrl} </td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}

export default Main;
