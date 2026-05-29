import { useState } from "react";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

const initialPosts = [
  {
  id: 1,
  category: "Food Recommendations",
  title: "Best restaurants near Seoul National University",
  author: "Subin",
  views: 214,
  likes: 52,
  content:
    "If you are an exchange student coming to Seoul National University, there are many great restaurants around campus. Near Nakseongdae Station and Seoul National University Station, you can find affordable Korean food, cozy cafes, and small local restaurants that students often visit. I recommend trying kimbap, tteokbokki, Korean BBQ, and simple lunch menus near the campus. These places are usually cheaper than restaurants in tourist areas, so they are perfect for students who want to enjoy Korean food without spending too much money.",
  comments: [
    "This is so helpful! I want to try local restaurants near campus.",
    "Affordable food near SNU sounds perfect for students.",
    "Please recommend specific restaurant names too!",
  ],
},

  {
    id: 2,
    category: "Travel Tips",
    title: "Use both KTX and express buses when traveling around Korea",
    author: "Jimin",
    views: 156,
    likes: 34,
    content:
      "When traveling to other cities in Korea, many exchange students think only about taking the KTX. However, express buses can also be very useful. For long-distance cities like Busan or Daegu, KTX is usually faster. But for places like Jeonju, Sokcho, or Gangneung, express buses can be more convenient depending on the location. Tickets can sell out quickly on weekends, so it is better to book in advance.",
    comments: [
      "I took an express bus to Gangneung and it was really comfortable!",
      "I only thought about KTX, but now I should check buses too.",
      "Booking weekend tickets early is such an important tip.",
    ],
  },
  {
    id: 3,
    category: "Cafe Recommendations",
    title: "Best quiet cafes for studying near campus",
    author: "Seoyeon",
    views: 132,
    likes: 27,
    content:
      "If you want to study outside your dorm, look for cafes with many outlets, stable Wi-Fi, and enough seating. Cafes near universities are usually student-friendly, but they can get crowded during exam periods. I recommend visiting in the morning or early afternoon if you want a quiet seat. Also, some cafes allow long study sessions, while others feel more like quick coffee spots, so check the atmosphere first.",
    comments: [
      "Outlets are so important for studying!",
      "I need a quiet cafe for assignments. Thanks!",
      "Morning study sessions sound better than evening ones.",
    ],
  },
  {
    id: 4,
    category: "Cosmetics",
    title: "Olive Young is useful for basic skincare and daily items",
    author: "Minji",
    views: 121,
    likes: 25,
    content:
      "If you need skincare, sunscreen, shampoo, makeup, or small daily items, Olive Young is a very convenient place to start. There are many stores near subway stations and university areas. Some products have discounts, so compare prices before buying. If your skin is sensitive, start with simple basic products instead of buying too many new items at once.",
    comments: [
      "Olive Young was one of the first stores I visited in Korea!",
      "The discounts are really helpful.",
      "Good tip about sensitive skin.",
    ],
  },
  {
    id: 5,
    category: "Mobile Discounts",
    title: "Check student-friendly mobile plans before buying a SIM card",
    author: "Daniel",
    views: 143,
    likes: 31,
    content:
      "Many exchange students buy a SIM card at the airport because it feels convenient. However, it can be cheaper to compare options near your university or online before deciding. Some stores offer student-friendly plans, prepaid SIM cards, or short-term plans for international students. Before you visit a store, prepare your passport, student ID, and address in Korea.",
    comments: [
      "I bought mine at the airport, but it was expensive.",
      "Do I need an Alien Registration Card for every plan?",
      "This is really useful for new exchange students.",
    ],
  },
  {
    id: 6,
    category: "School Programs",
    title: "Join the buddy program during your first month",
    author: "Yuna",
    views: 112,
    likes: 22,
    content:
      "Many Korean universities offer buddy programs for exchange students. A local student can help you understand campus life, course registration, school facilities, restaurants, and student events. It is also a great way to make your first Korean friend. If your school offers this program, apply early because spots may be limited.",
    comments: [
      "I want to join a buddy program!",
      "This would make the first month much less stressful.",
      "Making local friends is one of my goals.",
    ],
  },
  {
    id: 7,
    category: "Clubs",
    title: "Joining a club is one of the easiest ways to make friends",
    author: "Junho",
    views: 89,
    likes: 17,
    content:
      "If you want to make friends in Korea, joining a student club can be very helpful. Sports clubs, music clubs, language exchange clubs, and cultural clubs are good options for exchange students. Even if your Korean is not perfect, shared activities make communication easier. Try visiting club booths or checking your university's student community page at the beginning of the semester.",
    comments: [
      "I want to join a soccer club!",
      "Shared activities make it easier to talk to people.",
      "Club booths sound fun.",
    ],
  },
  {
    id: 8,
    category: "Travel Tips",
    title: "Plan Seoul trips by area, not by random attractions",
    author: "Hannah",
    views: 147,
    likes: 29,
    content:
      "Seoul has great public transportation, but tourist spots can be far from each other. It is better to plan your trip by area. For example, Gyeongbokgung Palace, Bukchon Hanok Village, and Insadong are good to visit on the same day. Hongdae and Yeonnam-dong also work well together. But visiting Gangnam, Myeongdong, Seongsu, and Hongdae all in one day can be tiring because of travel time.",
    comments: [
      "Seoul is bigger than I expected.",
      "Gyeongbokgung and Bukchon together sounds perfect!",
      "This will help me plan my weekend trip.",
    ],
  },
];

const categories = [
  "All",
  "Food Recommendations",
  "Travel Tips",
  "Cafe Recommendations",
  "Cosmetics",
  "Mobile Discounts",
  "School Programs",
  "Clubs",
];

function App() {
  const [postData, setPostData] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(initialPosts[0]);
  const [clickCount, setClickCount] = useState(0);
  const [newComment, setNewComment] = useState("");

  const filteredPosts =
    selectedCategory === "All"
      ? postData
      : postData.filter((post) => post.category === selectedCategory);

  const totalComments = postData.reduce(
    (total, post) => total + post.comments.length,
    0
  );

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setClickCount(clickCount + 1);

    window.gtag?.("event", "post_clicked", {
      event_category: "post",
      event_label: post.title,
      post_category: post.category,
    });
  };

  const handleWriteClick = () => {
    window.gtag?.("event", "write_post_clicked", {
      event_category: "button",
      event_label: "Write a Post",
    });

    alert(
      "This is a user-testing prototype. The real posting feature will be added later."
    );
    setClickCount(clickCount + 1);
  };

  const handleFeedbackClick = () => {
    window.gtag?.("event", "feedback_clicked", {
      event_category: "button",
      event_label: "Leave Feedback",
    });

    alert("Later, you can connect this button to a Google Form link.");
    setClickCount(clickCount + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      alert("Please write a comment first!");
      return;
    }

    const updatedPosts = postData.map((post) => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });

    const updatedSelectedPost = {
      ...selectedPost,
      comments: [...selectedPost.comments, newComment],
    };

    setPostData(updatedPosts);
    setSelectedPost(updatedSelectedPost);

    window.gtag?.("event", "comment_added", {
      event_category: "comment",
      event_label: selectedPost.title,
    });

    setNewComment("");
    setClickCount(clickCount + 1);
  };

  return (
    <div className="app">
      <header className="hero">
        <p className="label">Exchange Student Community in Korea</p>
        <h1>Korea Exchange Tips Board</h1>
        <p className="heroText">
          A community board for exchange students coming to Korea. Find useful
          tips about travel, cafes, cosmetics, mobile plans, school programs,
          and student clubs.
        </p>

        <div className="heroButtons">
          <button onClick={handleWriteClick}>Write a Post</button>
          <button className="secondaryButton" onClick={handleFeedbackClick}>
            Leave Feedback
          </button>
        </div>
      </header>

     <section className="stats">
      <div>
        <strong>{postData.length}</strong>
        <span>Posts</span>
      </div>
      <div>
        <strong>{totalComments}</strong>
        <span>Comments</span>
      </div>
    </section> 

      <main className="layout">
        <section className="leftPanel">
          <h2>Categories</h2>
          <div className="categoryList">
            {categories.map((category) => (
              <button
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => {
                  setSelectedCategory(category);
                  setClickCount(clickCount + 1);

                  window.gtag?.("event", "category_clicked", {
                    event_category: "category",
                    event_label: category,
                  });
                }}
              >    
                {category}
              </button>
            ))}
          </div>

          <h2>Posts</h2>
          <div className="postList">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className={
                  selectedPost.id === post.id ? "postCard selected" : "postCard"
                }
                onClick={() => handlePostClick(post)}
              >
                <span className="categoryTag">{post.category}</span>
                <h3>{post.title}</h3>
                <p>By {post.author}</p>
                <div className="meta">
                  <span>{post.views} views</span>
                  <span>{post.likes} likes</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="detailPanel">
          <span className="categoryTag">{selectedPost.category}</span>
          <h2>{selectedPost.title}</h2>
          <p className="author">By {selectedPost.author}</p>
          <p className="content">{selectedPost.content}</p>

          <div className="commentBox">
            <h3>Comments</h3>

            <div className="commentInputBox">
              <input
                type="text"
                placeholder="Write a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleAddComment}>Add Comment</button>
            </div>

            {selectedPost.comments.map((comment, index) => (
              <div className="comment" key={index}>
                <strong>Anonymous {index + 1}</strong>
                <p>{comment}</p>
              </div>
            ))}
          </div>
        </section>
       </main>

      <Analytics />
    </div>
  );
}

export default App;