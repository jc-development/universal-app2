import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import VideoJS from 'video.js';

export default class FAQ extends Component {

  constructor(props) {
    super(props);

    // VideoJS player
    this.player = null
  }

  componentDidMount () {
    // Nathan Brooks Video JS player
    this.player = VideoJS('video-selected')
  }

  componentWillUnmount () {
    this.player.dispose()
  }

  render() {
    return (
        <section id="faq">
          <Helmet>
            <title>Winner's Choice Strings - Frequently Asked Questions</title>
          </Helmet>
          <header>
            <h1>frequently asked questions</h1>
          </header>
          <article>
            <header>
              <h2>Are there any instructions for “shooting in” Winner’s Choice string and cables?</h2>
            </header>
            <p>When you’re installing your new set of Winner’s Choice String and Cables, you’ll want to install your peep sight and set to the correct height. You can add or subtract twists to line up the peep sight with your eye. Sometimes, your new string and cables will need to seat into the cam grooves. You’ll want to shoot your bow between 10 – 15 times, and realign your peep sight, if necessary.</p>
          </article>
          <article>
            <header>
              <h2>Does Winner’s Choice recommend adding speed buttons?</h2>
            </header>
            <p>Yes! In addition, we now offer <Link className="btn internal-link" to="/winners-choice-accessories/nitro-button-balls">Nitro speed buttons</Link> pre-installed on your string in the color of your choice. <Link className="btn internal-link" to="/winners-choice-accessories/nitro-button-balls">Speed buttons</Link> can also be purchased directly from Winner’s Choice in packs of 6. Two packs are required for most bows (6 bottom, 6 top). Single cam bows typically require only 1 pack installed on the bottom</p>
          </article>
          <article>
            <header>
              <h2>How many twists can I add or subtract from my string and cables?</h2>
            </header>
            <p>The amount of serving covering a particular string can hinder the number of twists that can be added or subtracted from a given piece. In most cases 4-6 twists either direction during tuning/peep alignment will allow the string or cable to perform as intended. A general rule of thumb is to maintain approximately 1 twist per 1” to 1-1/2”. * Twists are always added clockwise and subtracted counterclockwise.</p>
          </article>
          <section>
            <div className="homepage-video-wrapper">
              <h1 className="homepage-video-title">How to Properly Fix Peep Sight Rotation</h1>
              <p className="text-center">Winner's Choice Strings Pro Shooter Nathan Brooks talks about the importance of the peep sight and how to to fix peep sight rotation to get an accurate shot.</p>
              <video id="video-selected" className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls poster="https://s3.amazonaws.com/string-builder/website-images/nathan-brooks-string-peep-rotation.jpeg">
                <source src="https://s3.amazonaws.com/string-builder/videos/nathan-brooks-string-peep-rotation.mp4" type="video/mp4" />
                <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
              </video>
            </div>
          </section>
          <article>
            <header>
              <h2>Why has my bow lost poundage since installing Winner’s Choice string and cables?</h2>
            </header>
            <p>Draw weight, axle to axle length and brace height are all determined by string and cable length and overall diameter. With machining tolerances changing from one bow to the next, different string and cable lengths may be required to bring the bow in spec. Typically a couple twists one direction or the other will bring the bow back into factory spec (draw weight, axle to axle and brace height). Some factory string and cable sets  may elongate over time, changing the bows draw weight, axle to axle, and brace height.</p>
          </article>
          <article>
            <header>
              <h2>What is the average life of a set of Winner’s Choice string and cables?</h2>
            </header>
            <p>A well maintained string and cable set will last the average archer approximately 3 years. To get the most out of your string and cable set, condition the set regularly with Winner’s Choice’s <Link className="btn internal-link" to="/winners-choice-accessories/cobalt-ice-string-wax">Cobalt Ice String Wax</Link>, use a <Link className="btn internal-link" to="/winners-choice-accessories/ultimate-string-loop">D-loop</Link> to avoid excessive center serving wear from a release, avoid carrying your bow by the string and keep the string away from other abrasive surfaces.</p>
          </article>
          <article>
            <header>
              <h2>Will using less strands increase the speed of my bow?</h2>
            </header>
            <p>Typically, lower strand counts will increase speed, but you’ll experience an overall reduction of string and cable stability. Reducing strand count is not recommended due to warranty issues with virtually all bow manufacturers, as well as overall safety. The recommended number of strands allows us to construct the absolute best string and cables through our proprietary production process. The best way to increase speed with your Winner’s Choice string is by the addition of <Link className="btn internal-link" to="/winners-choice-accessories/nitro-button-balls">speed buttons</Link>.</p>
          </article>
      </section>
    );
  }
}
