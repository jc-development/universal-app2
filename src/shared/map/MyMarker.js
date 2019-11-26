import React from 'react';
import { defaultProps } from 'recompose';

const myMarker = () => (
    <div id="google-map-marker">
      <div></div>
      <p>Winner's Choice Bowstrings, LLC<br/>
        125 East Elkins Street, Building A, Suite C<br/>
        Stanton, KY 40380</p>
    </div>
);

export default defaultProps()(myMarker);
