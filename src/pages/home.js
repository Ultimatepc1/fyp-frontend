import React,{ useState, useEffect } from 'react'
import trending from '../api/mocks/trending'
import featured from '../api/mocks/featured'
import { PostMasonary, MasonaryPost,PostGrid } from '../components/common'

const trendingConfig = {
    1: {
      gridArea: '1 / 2 / 3 / 3'
    }
}
const featuredConfig = {
  0: {
    gridArea: '1 / 1 / 2 / 3',
    height: '300px'
  },
  1:{
    height: '250px'
  },
  3:{
    height: '600px',
    marginLeft: '30px',
    width: '600px'
  }
}
const mergeStyles = function (posts, config) {
    posts.forEach((post, index) => {
      post.style = config[index]
      post.author = 'Ultimatepc'
      post.description = 'Technical Blogs for Tech Community'
    })
}
const recentPosts = [ ...trending, ...featured, ...featured ];
//console.log(recentPosts)
mergeStyles(trending , trendingConfig);
mergeStyles(featured , featuredConfig);
const lastFeatured = featured.pop();

export default function Home(){
    const [width, setWidth] = useState(document.body.clientWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(document.body.clientWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return(
        <main className="home">
          <section className="container">
            <div className="row">
              <h2>Featured Posts</h2>
              <section className="featured-posts-container">  
                <PostMasonary  posts={featured} tagsOnTop={true} columns={2}/>
                <MasonaryPost post={lastFeatured} tagsOnTop={true} />
              </section>
            </div>
          </section>
          <section className="bg-white">
            <section className = "container">
              <div className="row" >
                <h2 id="recent">Recent Posts</h2>
                <PostGrid posts={recentPosts} />
              </div>
            </section>
          </section>
          <section className="container">
            <div className="row">
              <h2>Trending Posts</h2>
              <PostMasonary  posts={trending} columns={3}/>
            </div>
          </section>
        </main>
    );
}