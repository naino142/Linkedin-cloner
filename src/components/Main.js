import { useState, useEffect } from 'react';
import styled from "styled-components";

const Main = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [newPost, setNewPost] = useState({});

  const posts = [
    {
        id:1,
        postedBy: "Kunal",
        postText:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likes: 2,
        comments:[
            {
                by:"Rishabh",
                comment:"Great Share"
            }
        ]
    },
];

useEffect(() => {
    setAllPosts(posts);
  }, []);

  const handleLike = (postId) => {
    let updatedPosts = allPosts.map(post => {
      if (post.id === postId) {
        post.likes += 1;
      }
      return post;
    });
    setAllPosts(updatedPosts);
  }

  const handleComment = (e, postId, comment) => {
    e.preventDefault();
    let updatedPosts = allPosts.map(post => {
      if (post.id === postId) {
        post.comments.push({ by: "You", comment });
      }
      return post;
    });
    setAllPosts(updatedPosts);
  }

  const handleNewPost = (e) => {
    e.preventDefault();
    if (newPost.postedBy && newPost.title && newPost.postText) {
      let newPostId = allPosts.length + 1;
      let newPostObject = { ...newPost, id: newPostId };
      setAllPosts([...allPosts, newPostObject]);
      setNewPost({});
    } else {
      alert("Please fill all the fields before adding a post!");
    }
  }

  return (
    <Container>
      <h2>Add a Post</h2>
      <form>
        <input type="text" placeholder="Posted by" onChange={(e) => setNewPost({ ...newPost, postedBy: e.target.value })} required />
        <input type="text" placeholder="Post Title" onChange={(e) => setNewPost({
...newPost, title: e.target.value })} required />
<textarea rows="4" cols="50" placeholder="Post Content" onChange={(e) => setNewPost({ ...newPost, postText: e.target.value })} required />
<button type="submit" onClick={handleNewPost}>Add Post</button>
</form>
{allPosts.map(post => (
<div key={post.id}>
  <h2>{post.postedBy}</h2>
  <h3>{post.title}</h3>
  <p>{post.postText}</p>
  <button onClick={()=> handleLike(post.id)}>Like👍</button>
  <p>Likes: {post.likes}</p>
  {post.comments.map(comment => (
    <div key={comment.by}>
      <p>{comment.by}: {comment.comment}</p>
    </div>
  ))}
  <form onSubmit={(e) => handleComment(e, post.id, e.target.elements.comment.value)}>
    <input type="text" placeholder="Add a comment" name="comment" />
    <button type="submit">Comment</button>
  </form>
</div>
))}
</Container>
);
};

const Container = styled.div`
color:#6D67E4;grid-area: main;`;

export default Main;

