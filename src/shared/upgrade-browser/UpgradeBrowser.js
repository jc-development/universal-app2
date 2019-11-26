import React from 'react';

export const UpgradeBrowser = () => {

    const sectionStyle = {
        margin: "0 auto",
        backgroundColor: "#efefef",
        minHeight: "100vh",
        minWidth: "100vw",
        padding: "2rem 7.5%"
    }
    const h1Style = {
        textAlign: "left"
    }
    const linkStyle = {
        fontSize: "2rem"
    }
    return (
        <section style={sectionStyle}>
            <h1 style={h1Style}>Your Browser Needs To Be Updated</h1>
            <p>You're using Internet Explorer, which is not supported by Winners Choice Strings.</p>
            <p>If you are unsure how to upgrade, we recommend using the Google Chrome browser, since it can update automatically.</p>
            <a style={linkStyle} href="https://www.google.com/chrome/" target="_blank">Get Google Chrome</a>
        </section>
    )
}