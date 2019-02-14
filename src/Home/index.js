import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import Container from '../Container';
import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Main from '../Main';
import Scrollable from '../Scrollable';
import ForumWidget from './ForumWidget';

import { requestForumData } from '../redux/forum';

import styles from './index.module.css';
import BlogWidget from './BlogWidget';
import { requestBlogData } from '../redux/blog';
import Offline from '../Offline';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    const { dispatch } = this.props;
    dispatch(requestForumData());
    dispatch(requestBlogData());
  }

  render() {
    const { accent, blogData, blogLoading, blogUpdate, darkTheme, forumData, forumLoading, forumUpdate, online } = this.props;

    let forumDocument;
    let blogDocument;
    try {
      const parser = new DOMParser();
      forumDocument = parser.parseFromString(forumData, 'text/xml');
      blogDocument = parser.parseFromString(blogData, 'text/xml');
    } catch (e) {
      console.log(e);
    }

    const renderLastChecked = forumUpdate || blogUpdate ? (
      <div className={styles.subheading}>
        Last Checked:&nbsp;
        <span className="highlight">{new Date(forumUpdate || blogUpdate).toLocaleString([],
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
        </span>
      </div>
    ) : '';

    return !online ? (<Offline />) :
    (
      <Container>
        <Header title="Home" loading={blogLoading || forumLoading} />
        <Scrollable>
          <Main>
            <div className={styles.header}>
              <div className={styles.headings}>
                <h3 className="firstHeading">
                  FreeSO Announcements
                </h3>
                <div className={styles.subheading}>
                  {renderLastChecked}
                </div>
              </div>
              <div className={styles.refreshContainer}>
                <button className={styles.refresh} onClick={this.refresh}>Refresh</button>
              </div>
            </div>
            <BlogWidget blogData={blogDocument} />
          </Main>
          <InfoPanel>
            <ForumWidget forumData={forumDocument} />
            {/* Use this div to hide the emphasis text if offline */}
            <div>
              <div className="emphasis">Twitter @FreeSOGame</div>
              <TwitterTimelineEmbed
                borderColor={accent}
                linkColor={accent}
                highlightColor={accent}
                noBorders
                noFooter
                noHeader
                noScrollbar
                options={{
                  height: 2100,
                }}
                sourceType="profile"
                screenName="freesogame"
                theme={darkTheme ? 'dark' : 'light'}
                transparent
              />
            </div>
          </InfoPanel>
        </Scrollable>
      </Container>
    );
  }
};

const mapStateToProps = state => (
  {
    accent: state.settings.accent,
    blogData: state.blog.data,
    blogError: state.blog.error,
    blogLoading: state.blog.loading,
    blogUpdate: state.blog.lastUpdate,
    darkTheme: state.settings.darkTheme,
    forumData: state.forum.data,
    forumError: state.forum.error,
    forumLoading: state.forum.loading,
    forumUpdate: state.forum.lastUpdate,
    online: state.system.online,
  }
);

export default connect(mapStateToProps)(Home);