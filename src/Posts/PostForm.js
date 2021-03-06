import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PostForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    post: {},
    onSuccess: () => null
  }

  state = {
    id: this.props.post.id || '',
    title: this.props.post.title || '',
    body: this.props.post.body || '',
  }

  handleInput = event => {
    const formData = {};
    formData[event.target.name] = event.target.value;
    this.setState({...formData});
  }

  render() {
    const { onSubmit, onSuccess } = this.props;
    const { title, body, id } = this.state;
    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          variables: {
            title,
            body,
            id
          }
        }).then(() => {
          onSuccess();
        }).catch(error => console.log(error));
      }}>
        <input
          name="title"
          type="text"
          onChange={this.handleInput} value={title} placeholder="title"/>
        <textarea name="body" onChange={this.handleInput} value={body} id="" cols="30" rows="10" />
      <button className="button">Submit</button>
    </form>
    )
  }
}
