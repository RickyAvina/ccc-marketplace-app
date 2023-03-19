import { useEffect, useState } from "react";
import { sendXmlHttpRequest } from "./useAuth";

export default function usePosts(user_id) {
  const [posts, setPosts] = useState(null);

  async function getPosts(user_id) {
    console.log("Got a post from userId " + user_id);
    sendXmlHttpRequest("/get-posts", "GET", JSON.stringify({
      user_id
    })).then(posts => {
      setPosts(posts);
      console.log(posts);
    })
  }


  return { posts, getPosts };
}