import React, { useState } from "react";
import HeroSection from "./HeroSection";

// Define the menu structure
const menuItems = [
  {
    title: "Dashboard",
    icon: (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9L12 2L21 9V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V9Z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    link: "#",
  },
  {
    title: "Users",
    icon: (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="7" r="4" />
        <path d="M16 21V19C16 17.3431 14.6569 16 13 16H5C3.34315 16 2 17.3431 2 19V21" />
        <path d="M18 3.13A4 4 0 0 1 21 6.87C21 8.38943 20.0761 9.716 18.7457 10.2346" />
        <path d="M16 21V19C16 17.3431 14.6569 16 13 16H5C3.34315 16 2 17.3431 2 19V21" />
      </svg>
    ),
    subMenu: [
      {
        title: "Sub Menu 1",
        link: "#",
        subMenu: [
          { title: "Link 1", link: "#" },
          { title: "Link 2", link: "#" },
          { title: "Link 3", link: "#" },
        ],
      },
      { title: "Link 2", link: "#" },
      { title: "Link 3", link: "#" },
    ],
  },
  {
    title: "Account",
    icon: (
      <svg
        className="size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="15" r="3" />
        <circle cx="9" cy="7" r="4" />
        <path d="M10 15H6a4 4 0 0 0-4 4v2" />
        <path d="m21.7 16.4-.9-.3" />
        <path d="m15.2 13.9-.9-.3" />
        <path d="m16.6 18.7.3-.9" />
        <path d="m19.1 12.2.3-.9" />
        <path d="m19.6 18.7-.4-1" />
        <path d="m16.8 12.3-.4-1" />
        <path d="m14.3 16.6 1-.4" />
        <path d="m20.7 13.8 1-.4" />
      </svg>
    ),
    subMenu: [
      { title: "Link 1", link: "#" },
      { title: "Link 2", link: "#" },
      { title: "Link 3", link: "#" },
    ],
  },
  {
    title: "Projects",
    icon: (
      <svg
        className="size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
        <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
        <path d="M15 2v5h5" />
      </svg>
    ),
    subMenu: [
      { title: "Link 1", link: "#" },
      { title: "Link 2", link: "#" },
      { title: "Link 3", link: "#" },
    ],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="absolute w-full">
      <div className="top-0 flex content-center justify-between w-full h-12 p-2 lg:hidden bg-sky-600">
        <div>
          <h1>Logo</h1>
        </div>
        <button
          type="button"
          className="p-4 text-gray-500 hover:text-gray-600 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="docs-sidebar"
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>

      <div className="">
        <div
          id="docs-sidebar"
          className={`hs-overlay ${isOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300 transform fixed top-0 start-0 bottom-0 z-60 w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block dark:bg-neutral-800 dark:border-neutral-700`}
        >
          <div className="px-6">
            <a
              className="flex-none text-xl font-semibold dark:text-white"
              href="#"
              aria-label="Brand"
            >
              Brand
            </a>
          </div>
          <nav
            className="flex flex-col flex-wrap w-full p-6 hs-accordion-group"
            data-hs-accordion-always-open
          >
            <ul className="space-y-1.5">
              {menuItems.map((item, index) => (
                <li key={index} className="hs-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hs-accordion-active:text-white"
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.icon}
                    {item.title}
                    {item.subMenu && (
                      <>
                        <svg
                          className={`hs-accordion-active:block ms-auto ${activeIndex === index ? 'hidden' : 'block'} size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m18 15-6-6-6 6" />
                        </svg>
                        <svg
                          className={`hs-accordion-active:hidden ms-auto ${activeIndex === index ? 'block' : 'hidden'} size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </>
                    )}
                  </button>
                  {item.subMenu && (
                    <div
                      id={`accordion-content-${index}`}
                      className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
                    >
                      <ul className="pt-2 ps-2">
                        {item.subMenu.map((subItem, subIndex) => (
                          <li key={subIndex} className="hs-accordion">
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300"
                              href={subItem.link}
                            >
                              {subItem.title}
                            </a>
                            {subItem.subMenu && (
                              <ul className="pt-2 ps-3">
                                {subItem.subMenu.map((nestedItem, nestedIndex) => (
                                  <li key={nestedIndex}>
                                    <a
                                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300"
                                      href={nestedItem.link}
                                    >
                                      {nestedItem.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
