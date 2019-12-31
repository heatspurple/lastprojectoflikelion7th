import React, { Component, post } from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';
import Header from './Components/header';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

export default class App extends Component {

constructor(props) {
  super(props)
  this.state = {
    title: '',
    content: '',
    results: [],
  }
}

componentDidMount() {
  this.getPosts()
}

async getPosts() {
  let _results = await api.getAllPosts()
  this.setState({ results: _results.data })
}

handleChange = evt => {
  this.setState({
    [evt.target.name]: evt.target.value,
  })
}

handleSubmit = async (evt) => {
  evt.preventDefault()
  let result = await api.createPost({
    title: this.state.title,
    content: this.state.content,
  })
  console.log("완료!", result)
  this.setState({
    title: '',
    content: '',
  })
  this.getPosts()
}

handleDelete = async id => {
  await api.deletePost(id)
  this.getPosts()
}

render() {
return (
  <div className="App">
    <Header />
    <Container maxWidth="sm">
  <Card className="PostingSection">
    <h3>Write</h3>
    <form className="" onSubmit={this.handleSubmit}>
      <TextField
      type="text"
      name="title" 
      label="제목"
      style={{width:300}}
      onChange={this.handleChange} 
      value={this.state.title}/>
      <br/>
      <br/>
      <textarea 
      name="content" 
      style={{width:400, height: 100}}
      onChange={this.handleChange} 
      value={this.state.content}>
      </textarea>
      <br/>
      <br/>
      <Button variant="contained" type="submit">제출하기</Button>
    </form>
  </Card>
  <br/>
  <Card className="ViewSection">
    {this.state.results.map(post => (
      <div>
      <PostView 
        key={post.id}
        id={post.id}
        title={post.title}
        content={post.content}
      />
    <Button variant="contained" type='submit' onClick={event => this.handleDelete(post.id)}>삭제하기</Button>
  </div>
    ))}
  </Card>
  </Container>
</div>
);
}
}