import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import VideoJS from 'video.js/dist/video.min';


export default class HowStringCablesMade extends Component {

  constructor (props) {
    super()
    this.player1 = null
    this.player2 = null
  }

  componentDidMount () {
    this.player1 = VideoJS('video-selected1')
    this.player2 = VideoJS('video-selected2')
  }

  componentWillUnmount () {
    this.player1.dispose()
    this.player2.dispose()
  }

  render() {
    return (
      <section id="how-strings-are-made">
        <Helmet>
          <title>Winner's Choice Strings - How Strings & Cables are made - Winner's Choice Strings and Cables are designed by YOU, and made right here, in the U.S.A.</title>
        </Helmet>
        <article>
          <header className="text-center">
              <h1 className="how-made">HOW STRINGS &amp; CABLES ARE MADE</h1>
              <p>We are fully invested in creating performant strings and cables of unrivaled quality. Winner's Choice Strings and Cables are designed by YOU, and made right here, in the U.S.A.</p>
          </header>
          <section className="row">
            <article>
              <header>
                <h2>Step 1. You design your strings.</h2>
                <p>Use the <Link  className="btn internal-link" to="/string-builder">Winner's Choice String Builder</Link> to create limitless custom string configurations and options that ship to your door within days, not weeks.</p>
              </header>
              <div className="jumbotron">
                <video id='video-selected1' className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
                  poster="https://s3.amazonaws.com/string-builder/videos/poster.jpg" controls>
                  <source src="https://s3.amazonaws.com/string-builder/videos/how-strings-built.mp4" type="video/mp4" />
                  <p className='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to a web browser that <a href='http://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a></p>
                </video>
              </div>
            </article>
          </section>

          <section className="row">
            <article>
              <header>
                <h2>Step 2. We instantly receive your order, build, and ship out your masterpiece.</h2>
                <p>Constructed with the industry’s best material, Winner’s Choice Custom strings let you build a string that exceeds the demands of your bow’s performance needs, with the colors, combos and flare to match your personality.</p>
              </header>
            </article>
            <div className="jumbotron">
              <video id='video-selected2' className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
                poster="https://s3.amazonaws.com/string-builder/website-images/how-its-made-poster.jpg" controls>
                <source src="https://s3.amazonaws.com/string-builder/videos/Winners_Choice_Tour.mp4" type="video/mp4" />
                <p className='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to a web browser that <a href='http://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a></p>
              </video>
            </div>
          </section>

          <section className="row">
            <article>
              <header>
                <h2>THE WORLD'S MOST ADVANCED &amp; RELIABLE BOWSTRINGS</h2>
              </header>
              <p>At Winner's Choice, we build a better bowstring. We use state-of-the-art materials, customized manufacturing processes, and innovative technology to assure you of the ultimate in bowstring performance. Put a Winner's Choice bowstring on your bow and string creep, peep rotation and serving separation issues will be a thing of the past.<br />We guarantee it! We call it the <Link className="btn internal-link" to="/lifetime-string-performance-guarantee">Lifetime String Performance Guarantee</Link> because that is precisely what it is. Performance. Guaranteed!</p>
            </article>
          </section>
        </article>
      </section>
    );
  }
}
