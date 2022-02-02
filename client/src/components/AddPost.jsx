import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
// import createEmojiPlugin from "draft-js-emoji-plugin";
// import "draft-js-emoji-plugin/lib/plugin.css";
import { Link } from "react-router-dom";
import "draft-js/dist/Draft.css";
import debounce from "lodash/debounce";

// import { Link } from "react-router-dom";

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
