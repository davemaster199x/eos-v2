import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ items }) => {
    return (
        <ul className="space-y-4">
            {items.map((group, index) => (
                <li key={index} className="nav-group">
                    {group.header && (
                        <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                            <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span>{group.header}</span>
                        </h2>
                    )}
                    <ul className="mt-2">
                        {group.links.map((item, idx) => (
                            <li className="menu nav-item" key={idx}>
                                <NavLink to={item.href} className="nav-link group">
                                    <div className="flex items-center">
                                        {item.icon}
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{item.label}</span>
                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default Navigation;
