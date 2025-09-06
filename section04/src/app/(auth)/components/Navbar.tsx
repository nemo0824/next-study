import { useState } from "react";
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconMenu2,
  IconChevronLeft,
} from "@tabler/icons-react";

const data = [
  { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

export function Navbar() {
  const [active, setActive] = useState("Billing");
  const [isOpen, setIsOpen] = useState(true);
  const links = data.map((item) => (
    <button
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
      className={`flex items-center px-3 py-2 text-sm w-full cursor-pointer text-white hover:bg-blue-600 rounded-md transition-colors ${
        item.label === active ? "bg-blue-600 text-blue-100 " : ""
      } ${!isOpen ? "justify-center" : ""}`}
      key={item.label}
    >
      <item.icon className={`w-4 h-4 ${isOpen ? "mr-3" : ""}`} stroke={1.5} />
      {isOpen && <span>{item.label}</span>}
    </button>
  ));

  return (
    <nav
      className={`${
        isOpen ? "w-48" : "w-14"
      } h-full bg-blue-800 border-r border-blue-700 flex flex-col transition-all duration-300`}
    >
      <div className="flex-1">
        <div
          className={`p-2 flex mt-1 ${
            isOpen ? "justify-end " : "justify-center"
          }`}
        >
          {isOpen ? (
            <IconChevronLeft
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 cursor-pointer text-blue-200 hover:text-blue-100"
            />
          ) : (
            <IconMenu2
              onClick={() => setIsOpen(true)}
              className="w-6 h-6 cursor-pointer text-blue-200 hover:text-blue-100"
            />
          )}
        </div>
        <div className="p-2 space-y-1">{links}</div>
      </div>

      <div className="border-t border-blue-400 p-2 space-y-1">
        <a
          href="#"
          className="flex items-center px-3 py-2 text-sm text-white hover:bg-blue-700 rounded-md transition-colors"
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className="w-4 h-4 mr-3" stroke={1.5} />
          {isOpen ? <span>Logout</span> : null}
        </a>
      </div>
    </nav>
  );
}
