import React, { Fragment } from 'react';

const ForumWidget = (props) => {
  const { forumData } = props;
  const items = forumData.querySelectorAll('item');

  const renderWidget = items ? [
    <div key="title" className="emphasis">
      Recently Active Forum Posts
    </div>,
    <ul key="links" className="list">
    {
      [...items].map((item, index) => {
        if (index <= 5) {
          const title = item.querySelector('title').textContent;
          return (
            <li className="link" key={title}>
              <a href={item.querySelector('link').textContent} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </li>
          );
        } else {
          return '';
        }
      })
    }
      <li className="link"></li>
    </ul>,
   ] : '';
  return (
    <Fragment>
      {renderWidget}
    </Fragment>
  );
}

export default ForumWidget;