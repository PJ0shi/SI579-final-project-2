import React from "react";

function Footer(){

    const currentYear = new Date().getFullYear()
    return (
        <footer>
            <p>
                University of Michigan School of Information Copyright {currentYear}
            </p>
        </footer>
    );
}

export default Footer;