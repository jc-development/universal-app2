import React from 'react'; // , { Component }
import { withState, withProps, compose } from 'recompose';
import GoogleMapReact from 'google-map-react'
import MyMarker from './MyMarker'

const map = ({
  onMapPropsChange,
  mapProps: {
    center,
    zoom
  }
}) => (
  <GoogleMapReact
    bootstrapURLKeys={
      {
        key:'AIzaSyD5WCexbW9lmmLLzUd66IMUkHhiO3QGNZI'
      }
    }
    onChange={onMapPropsChange}
    center={center}
    zoom={zoom}
  >
    <MyMarker
      lat={37.842835}
      lng={-83.856936}
    />
  </GoogleMapReact>
)

export default compose(
  withState('mapProps', 'onMapPropsChange', {
    center: {
      lat: 37.842835,
      lng: -83.856936
    },
    zoom: 17
  }),
withProps(({mapProps}) => console.log(mapProps)))(map)
