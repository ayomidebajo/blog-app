import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";

@inject("post")
// create post
// change Card UI
//get profile

@observer
class AddPost extends Component {
  navContainer = React.createRef(null);
  state = {
    isVisble: false,
    editorState: EditorState.createEmpty(),
    publish: true,
    title: "",
  };

  callBackFunction = (entries) => {
    const [entry] = entries;
    this.setState({
      ...this.state,
      isVisble: !entry.isIntersecting,
    });
  };

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  _onCodeCLick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "CODE"));
  }

  _onItalickClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  }

  _onStrikeThroughClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
    );
  }

  _onUnderLineClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  }

  //  type DraftInlineStyleType = 'BOLD' | 'CODE' | 'ITALIC' | 'STRIKETHROUGH' | 'UNDERLINE';

  optionsFunc = () => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: [0.0, 1.0],
    };
    return options;
  };

  createPost = debounce((content) => {
    console.log(content, "from createPost");
    let obj = {
      title: this.state.title,
      body: content.blocks,
      author: "amila",
      draft: false,
    };
    console.log(obj, "submit");
    this.props.post.createPost(obj);
  }, 1000);

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    if (this.state.publish) {
      this.createPost(convertToRaw(contentState));
    }
    this.setState({
      ...this.state,
      editorState,
    });
  };

  onChangeTitle = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    const observerNav = new IntersectionObserver(
      this.callBackFunction,
      this.optionsFunc
    );
    if (this.navContainer.current) {
      observerNav.observe(this.navContainer.current);
    } else {
      return null;
    }
  }
  render() {
    // const imagePlugin = createEmojiPlugin();
    // const { EmojiSuggestions } = imagePlugin;
    //fix editor bugs
    return (
      <div>
        <div className="container">
          <div className="navbar-custom__container" ref={this.navContainer}>
            <div
              className={`navbar-custom ${
                this.state.isVisble ? "navbar-custom__active" : ""
              }`}
            >
              <ul className="navbar-links__container">
                <li className="navbar-link">
                  <div className="logo">
                    <em>
                      Blog{" "}
                      {console.log(
                        this.state.isVisble ? "hell yeah" : "hell no"
                      )}
                    </em>
                  </div>
                </li>
                <li className="navbar-link">
                  <div className="mr-2">
                    <svg
                      width="13"
                      height="16"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.89 20 8 20ZM14 14V9C14 5.93 12.36 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.63 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </li>

                <li className="navbar-link dropdown">
                  <div
                    className="avatar dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  ></div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      key="create-post"
                      className="dropdown-item"
                      to="/post"
                    >
                      Create post
                    </Link>
                    <Link key="dashboard" className="dropdown-item" to="#">
                      Dashboard
                    </Link>
                    <Link
                      to="#"
                      key="change-username"
                      className="dropdown-item"
                    >
                      Change Username
                    </Link>
                    <Link
                      to="#"
                      key="logout"
                      className="dropdown-item"
                      onClick={() => this.props.authStore.logOut()}
                    >
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="container-editor">
            <textarea
              name="title"
              id=""
              onChange={this.onChangeTitle}
              cols="30"
              rows="10"
              className="title-input"
              placeholder="Add title here"
            />
            <div className="editor-style-btn__container">
              <div className="editor-style-btn__child">
                <button
                  onClick={this._onBoldClick.bind(this)}
                  className="editor-style-btn"
                >
                  B
                </button>
                <button
                  onClick={this._onCodeCLick.bind(this)}
                  className="editor-style-btn"
                >
                  &lt; &gt;
                </button>
                <button
                  onClick={this._onItalickClick.bind(this)}
                  className="editor-style-btn"
                >
                  <em>I</em>
                </button>
                <button
                  onClick={this._onStrikeThroughClick.bind(this)}
                  className="editor-style-btn"
                >
                  S
                </button>
                <button
                  onClick={this._onUnderLineClick.bind(this)}
                  className="editor-style-btn text-underline"
                >
                  U
                </button>
              </div>
            </div>

            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              placeholder="Write your blog content here..."
            />
          </div>
          <div className="mt-5 text-center">
            <button
              className="btn-post"
              onClick={() => {
                this.setState({
                  ...this.state,
                  publish: !this.state.publish,
                });
              }}
            >
              publish
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPost;
