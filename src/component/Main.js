import axios from "axios";
import React from "react";
const URL = "https://jsonplaceholder.typicode.com/posts";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      id: "",
      userId: "",
      title: "",
      body: "",
    };
  }
  createpost = async () => {
    try {
      const { userId, title, body } = this.state;
      const { data: post } = await axios.post(URL, {
        userId,
        title,
        body,
      });
      const posts = [...this.state.posts];
      posts.push(post);
      this.setState({ posts, userId: "", title: "", body: "" });
    } catch (err) {
      console.error("created data", err);
    }
  };
  getpost = async () => {
    try {
      const { data } = await axios.get(URL);
      this.setState({ posts: data });
      console.log(data);
    } catch (err) {
      console.log("invalid data", err);
    }
  };
  updatepost = async () => {
    try {
      const { id, userId, title, body } = this.state;
      const { data: post } = await axios.put(`${URL}/${id}`, {
        userId,
        title,
        body,
      });
      const posts = [...this.state.posts];
      const index = posts.findIndex((p) => p.id === id);
      posts[index] = post;
      this.setState({ posts, id: "", userId: "", title: "", body: "" });
    } catch (err) {
      console.error("updated data", err);
    }
  };

  delete = async (postId) => {
    try {
      await axios.delete(`${URL}/${postId}`);
      console.log(`${postId} was deleted!`);
      let posts = [...this.state.posts];
      posts = posts.filter((post) => post.id !== postId);
      this.setState({ posts, userId: "", title: "", body: "" });
    } catch (err) {
      console.error("datas deleted from server", err);
    }
  };

  componentDidMount() {
    this.getpost();
  }
  handelChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    if (this.state.id) {
      this.updatepost();
    } else {
      this.createpost();
    }
  };
  updateto = (post) => {
    this.setState({ ...post });
  };

  render() {
    return (
      <>
        <h1>Post App</h1>
        <form onSubmit={this.handelSubmit}>
          <div>
            <label>UserId:</label>
            <input
              type="text"
              name="userId"
              value={this.state.userId}
              onChange={this.handelChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Title :</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handelChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Body:</label>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handelChange}
              required
            />
          </div>
          <br />
          <button type="submit">submit</button>
        </form>
        <table>
          <tr>
            <th>PostId</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Body</th>
            {/* <th>Thumbnailurl</th> */}
            <th>Action</th>
          </tr>
          {this.state.posts.map((post) => {
            return (
              <tr>
                <td>{post.userid} </td>
                <td>{post.id} </td>
                <td>{post.title} </td>
                <td>{post.body} </td>
                {/* <td>{post.url} </td>
                <td>{post.thumbnailUrl} </td> */}
                <td>
                  <button onClick={() => this.delete(post.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => this.updateto(post)}>update</button>
                </td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}

export default Main;
