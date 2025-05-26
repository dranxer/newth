import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import styles from './BlogIndex.module.css';

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://public-api.wordpress.com/rest/v1.1/sites/thethinkindiablog.wordpress.com/posts/?number=9&page=${page}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.posts || !Array.isArray(data.posts)) {
          throw new Error('Invalid response format from WordPress API');
        }

        setHasMore(data.found > page * 9);
        
        if (page === 1) {
          setPosts(data.posts);
        } else {
          setPosts(prev => [...prev, ...data.posts]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err.message || 'Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && page === 1) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </>
    );
  }

  if (error && page === 1) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.error}>
            <h2>Error</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Blog | Think India IIT Roorkee</title>
        <meta name="description" content="Latest news and updates from Think India IIT Roorkee" />
      </Head>

      <Navbar />
      
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Blog</h1>
          <div className={styles.headerUnderline}>
            <span className={styles.saffronLine}></span>
            <span className={styles.whiteLine}></span>
            <span className={styles.greenLine}></span>
          </div>
        </header>

        <div className={styles.blogGrid}>
          {posts.map((post) => (
            <article key={post.ID} className={styles.blogCard}>
              <div className={styles.imageContainer}>
                {post.featured_image ? (
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className={styles.blogImage}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <Image
                      src="/think-india-blog-placeholder.png"
                      alt="Think India Blog"
                      width={400}
                      height={250}
                      className={styles.blogImage}
                    />
                  </div>
                )}
              </div>
              <div className={styles.blogContent}>
                <h2 className={styles.blogTitle}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <div className={styles.blogMeta}>
                  <span className={styles.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {post.categories && post.categories.length > 0 && (
                    <span className={styles.category}>
                      {post.categories[0].name}
                    </span>
                  )}
                </div>
                <div 
                  className={styles.blogExcerpt}
                  dangerouslySetInnerHTML={{ 
                    __html: post.excerpt.substring(0, 150) + '...' 
                  }}
                />
                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read More
                  <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button 
              onClick={loadMore} 
              className={styles.loadMoreButton}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More Posts'}
            </button>
          </div>
        )}
      </div>
    </>
  );
} 