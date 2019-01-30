import React, { PureComponent } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import Container from '../Container';
import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Main from '../Main';
import Scrollable from '../Scrollable';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadingBlog: false,
      loadingForum: false,
    }
  }
  render() {
    const { accent, darkTheme } = this.props;
    const { loadingBlog, loadingForum } = this.state;
    return (
      <Container>
        <Header title="Home" loading={loadingBlog || loadingForum} />
        <Scrollable>
          <Main>
          <div className="emphasis">
              Recent Forum Activity
            </div>
            <ul className="clearList">
            {/* eslint-disable */}
              <li className="link"><a href="">Freeso Cover and Advertising</a></li>
              <li className="link"><a href="">More ideas for lot diversity and game economy</a></li>
              <li className="link"><a href="">FreeSO Launcher stuck extracting client files</a></li>
              <li className="link"><a href="">Alessandro's Remeshing Corner</a></li>
              <li className="link"><a href="">Mr. Sin's Modeled Goods</a></li>
            </ul>
          </Main>
          <InfoPanel>
            <div className="emphasis">
              Recent Forum Activity
            </div>
            <ul className="clearList">
              <li className="link"><a href="">Freeso Cover and Advertising</a></li>
              <li className="link"><a href="">More ideas for lot diversity and game economy</a></li>
              <li className="link"><a href="">FreeSO Launcher stuck extracting client files</a></li>
              <li className="link"><a href="">Alessandro's Remeshing Corner</a></li>
              <li className="link"><a href="">Mr. Sin's Modeled Goods</a></li>
            </ul>
            <div>
            <div className="emphasis">Twitter @FreeSOGame</div>
            <TwitterTimelineEmbed
              borderColor={accent}
              linkColor={accent}
              highlightColor={accent}
              noBorders
              noFooter
              noHeader
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

export default Home;