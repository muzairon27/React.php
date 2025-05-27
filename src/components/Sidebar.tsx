import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const toggleAccordion = (label: string) => {
    setOpenAccordions((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const sidebarMenus = [
    {
      section: "Menu Utama",
      items: [
        {
          label: "Ringkasan",
          path: "/admin/overview",
          iconBlack: "/assets/images/icons/home-black.svg",
          iconBlue: "/assets/images/icons/home-blue.svg",
        },
        {
          label: "Spesialis",
          path: "/admin/specialists",
          iconBlack: "/assets/images/icons/stetoscop-black.svg",
          iconBlue: "/assets/images/icons/stetoscop-blue.svg",
        },
        {
          label: "Rumah Sakit",
          path: "/admin/hospitals",
          iconBlack: "/assets/images/icons/hospital-black.svg",
          iconBlue: "/assets/images/icons/hospital-blue.svg",
        },
        {
          label: "Transaksi",
          path: "/admin/transactions",
          iconBlack: "/assets/images/icons/note-2-black.svg",
          iconBlue: "/assets/images/icons/note-2-blue.svg",
        },
      ],
    },
    {
      section: "Pengaturan Akun",
      items: [
        {
          label: "Dokter",
          path: "/admin/doctors",
          iconBlack: "/assets/images/icons/profile-2user-black.svg",
          iconBlue: "/assets/images/icons/profile-2user-blue.svg",
        },
        {
          label: "Kelola Data",
          accordion: true,
          children: [
            {
              label: "Data Spesialis",
              path: "/admin/specialists",
              iconBlack: "/assets/images/icons/profile-black.svg",
              iconBlue: "/assets/images/icons/profile-tick-blue.svg",
            },
            {
              label: "Data Transaksi",
              path: "/admin/transactions",
              iconBlack: "/assets/images/icons/profile-black.svg",
              iconBlue: "/assets/images/icons/profile-tick-blue.svg",
            },
          ],
        },
      ],
    },
  ];

  return (
    <aside className="relative flex h-auto w-[280px] shrink-0 bg-white">
      <div className="flex flex-col fixed top-0 w-[280px] shrink-0 h-screen pt-[30px] px-4 gap-[30px]">
        <img
          src="/assets/images/logos/kemenkes.png"
          className="h-10 w-fit"
          alt="logo"
        />
        <div className="flex flex-col gap-5 overflow-y-scroll hide-scrollbar h-full overscroll-contain">
          {sidebarMenus.map((section) => (
            <nav key={section.section} className="flex flex-col gap-4">
              <p className="font-medium text-monday-gray">{section.section}</p>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => {
                  const isAccordion = !!item.accordion;
                  const isOpen = openAccordions.includes(item.label);

                  if (isAccordion && item.children) {
                    return (
                      <li key={item.label} className="group flex flex-col">
                        <button
                          onClick={() => toggleAccordion(item.label)}
                          className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
                        >
                          <div className="relative flex size-6 shrink-0">
                            <img
                              src="/assets/images/icons/data.svg"
                              className="size-6"
                              alt="icon"
                            />
                          </div>
                          <p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full text-left">
                            {item.label}
                          </p>
                          <img
                            src="/assets/images/icons/arrow-circle-up.svg"
                            className={`size-6 transition-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            alt="icon"
                          />
                        </button>

                        {isOpen && (
                          <div className="flex">
                            <div className="flex w-[56px] shrink-0 justify-end items-start">
                              <img
                                src="/assets/images/icons/accordion-branch.svg"
                                className="w-[28px]"
                                alt="icon"
                              />
                            </div>
                            <ul className="flex flex-col gap-1 w-full">
                              {item.children.map((child) => {
                                const isChildActive =
                                  location.pathname === child.path;
                                return (
                                  <li
                                    key={child.label}
                                    className={`group ${
                                      isChildActive ? "active" : ""
                                    }`}
                                  >
                                    <Link
                                      to={child.path}
                                      className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
                                    >
                                      <div className="relative flex size-6 shrink-0">
                                        <img
                                          src={child.iconBlack}
                                          className={`size-6 absolute ${
                                            isChildActive
                                              ? "opacity-0"
                                              : "opacity-100"
                                          } transition-300`}
                                          alt="icon"
                                        />
                                        <img
                                          src={child.iconBlue}
                                          className={`size-6 absolute ${
                                            isChildActive
                                              ? "opacity-100"
                                              : "opacity-0"
                                          } transition-300`}
                                          alt="icon"
                                        />
                                      </div>
                                      <p
                                        className={`font-medium transition-300 w-full ${
                                          isChildActive
                                            ? "text-monday-blue"
                                            : ""
                                        }`}
                                      >
                                        {child.label}
                                      </p>
                                      <div
                                        className={`w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden ${
                                          isChildActive ? "flex" : ""
                                        } transition-300`}
                                      />
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  }

                  const isActive = location.pathname === item.path;

                  return (
                    <li key={item.label} className="group">
                      {item.path && (
                        <Link
                          to={item.path}
                          className={`flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 ${
                            isActive ? "group-[&.active]:bg-monday-blue/10" : ""
                          } transition-300`}
                        >
                          {/* icons + label */}
                          <div className="relative flex size-6 shrink-0">
                            <img
                              src={item.iconBlack}
                              className={`size-6 absolute ${
                                isActive ? "opacity-0" : "opacity-100"
                              } transition-300`}
                              alt="icon"
                            />
                            <img
                              src={item.iconBlue}
                              className={`size-6 absolute ${
                                isActive ? "opacity-100" : "opacity-0"
                              } transition-300`}
                              alt="icon"
                            />
                          </div>
                          <p
                            className={`font-medium transition-300 w-full ${
                              isActive ? "text-monday-blue" : ""
                            }`}
                          >
                            {item.label}
                          </p>
                          <div
                            className={`w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden ${
                              isActive ? "flex" : ""
                            } transition-300`}
                          />
                        </Link>
                      )}
                    </li>
                  );
                  
                })}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
