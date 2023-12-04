import React from "react";

function Header ({onLogout}) {
    return <header>
        <div className="header-flex">
            <img src="logo.png" alt="Logo" />
            <h1>SI Courses Feedback</h1>
            <button className="btn btn-primary" onClick={onLogout}> Logout </button>
        </div>
    </header>
}

export default Header;