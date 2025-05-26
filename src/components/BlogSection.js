import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogSection.module.css';

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Using the WordPress.com REST API v1.1 with proper headers
        const response = await fetch(
          'https://public-api.wordpress.com/rest/v1.1/sites/thethinkindiablog.wordpress.com/posts/?number=3',
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

        setPosts(data.posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err.message || 'Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className={styles.blogSection}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.blogSection}>
        <div className={styles.error}>
          <h3>Unable to Load Blog Posts</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={styles.blogSection}>
        <div className={styles.error}>
          <h3>No Blog Posts Available</h3>
          <p>There are no blog posts to display at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.blogSection}>
      <div className={styles.sectionHeader}>
        <h2>Latest from Our Blog</h2>
        <div className={styles.headerUnderline}>
          <span className={styles.saffronLine}></span>
          <span className={styles.whiteLine}></span>
          <span className={styles.greenLine}></span>
        </div>
      </div>

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
                    src="/blog-placeholder.jpg"
                    alt="Blog placeholder"
                    width={400}
                    height={250}
                    className={styles.blogImage}
                  />
                </div>
              )}
            </div>
            <div className={styles.blogContent}>
              <h3 className={styles.blogTitle}>
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
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

      <div className={styles.viewAllContainer}>
        <Link href="/blog" className={styles.viewAllButton}>
          View All Posts
          <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </section>
  );
} 