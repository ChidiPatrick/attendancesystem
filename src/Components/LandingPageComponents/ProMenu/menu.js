import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const menu = () => {
  const [open, setOpen] = useState(false);

  const menuHandler = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="md:hidden relative" onClick={menuHandler}>
        {open ? <FaTimes size={20} /> : <FaBars size={20} />}
      </div>
      <div className=" absolute left-0 h-screen w-1/2 top-2">
        <ul>
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link> My Profile</Link>
          </li>
          <li>
            <Link> Seek Permission</Link>
          </li>
          <li>
            <Link> History</Link>
          </li>
          <li>
            <Link> Announcement</Link>
          </li>
          <li>
            <Link> Log out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default menu;
