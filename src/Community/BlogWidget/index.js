import React, { Fragment } from 'react';

import styles from './index.module.css';

const BlogWidget = (props) => {
  const { blogData } = props;
  const items = blogData.querySelectorAll('item');
  const renderWidget = items ? (
    <div>
      {
        [...items].map((item, index) => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const date = item.querySelector('pubDate').textContent;
          const author = item.querySelector('creator').textContent;
          const body = item.querySelector('description').textContent.replace(' [&#8230;]', '... ');

          return (
            <div key={link} className={styles.post}>
              <h3 className={styles.blogHeading}><a href={link} target="_blank" rel="noopener noreferrer">{title}</a></h3>
              
              <div className={styles.authorDate}>
                By {author} on {new Date(date).toLocaleString([], {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
              <a href={link} className={styles.readMore} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          );
        })
      }
    </div>
  ) : <div />;
  return (
    <Fragment>
      {renderWidget}
    </Fragment>
  )
}

export default BlogWidget;