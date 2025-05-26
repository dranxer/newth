import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import styles from './BlogPost.module.css';

export default function BlogPost({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://public-api.wordpress.com/rest/v1.1/sites/thethinkindiablog.wordpress.com/posts/slug:${slug}`,
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
        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message || 'Failed to load blog post. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Post Not Found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className={styles.backButton}>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Think India IIT Roorkee</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
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
        </header>

        {post.featured_image && (
          <div className={styles.featuredImage}>
            <Image
              src={post.featured_image}
              alt={post.title}
              width={1200}
              height={600}
              className={styles.image}
            />
          </div>
        )}

        <article className={styles.content}>
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className={styles.shareSection}>
          <h3>Share this post</h3>
          <div className={styles.socialButtons}>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
} 