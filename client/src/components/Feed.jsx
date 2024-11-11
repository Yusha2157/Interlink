import React from 'react'
import "../styles/feed.css";
import moment from 'moment';

const Feed = () => {
    const mockPosts = [
        {
          userName: "Jane Doe",
          userAvatar: "path/to/avatar.jpg", 
          date: new Date(),
          content: "This is a sample post! Excited to be here.",
        },
        {
          userName: "John Smith",
          userAvatar: "path/to/avatar2.jpg",
          date: new Date(Date.now() - 3600 * 1000),
          content: "Had a great day exploring new coding techniques!",
        }
      ];
  return (
    <>
        <div className="postCreator">
    <textarea placeholder="What's on your mind?" className="postInput"></textarea>
    <button className="postButton">Post</button>
  </div>

  <div className="postsFeed">
    {mockPosts.map((post, index) => (
      <div key={index} className="postCard">
        <div className="postHeader">
          <div className="userAvatar">
            <img src={post.userAvatar} alt="User Avatar" height={"40px"} />
          </div>
          <div className="userInfo">
            <h4 className="userName">{post.userName}</h4>
            <p className="postDate">{moment(post.date).fromNow()}</p>
          </div>
        </div>
        <div className="postContent">
          <p>{post.content}</p>
        </div>
        <div className="postActions">
          <button className="likeButton">👍 Like</button>
          <button className="commentButton">💬 Comment</button>
          <button className="shareButton">🔗 Share</button>
        </div>
      </div>
    ))}
  </div>
    </>
  )
}

export default Feed
