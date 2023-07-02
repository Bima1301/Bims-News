import { useState } from "react";
import ApplicationLogo from "@/Components/Dashboard/Other/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/Dashboard/Other/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ auth, header, children }) {
    // console.log("LAY", auth);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block w-auto fill-current text-xl  font-extrabold" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {auth.user.role_name != "viewer" ? (
                                    <NavLink
                                        href={route("mypost.index")}
                                        active={
                                            route().current("mypost.index") ||
                                            route().current("mypost.create") ||
                                            route().current("mypost.edit")
                                        }
                                    >
                                        {auth.user_permission.includes(
                                            "all post"
                                        )
                                            ? "All Post"
                                            : "My Post"}
                                    </NavLink>
                                ) : (
                                    ""
                                )}
                            </div>
                            {auth.user_permission.includes("owner post") &&
                                auth.user_permission.includes("all post") && (
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink
                                            href={route("mypost.adminPost")}
                                            active={
                                                route().current(
                                                    "mypost.adminPost"
                                                ) ||
                                                route().current(
                                                    "mypost.adminPost"
                                                )
                                            }
                                        >
                                            My Post
                                        </NavLink>
                                    </div>
                                )}
                            {auth.user_permission.includes("read category") && (
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink
                                        href={route("category.index")}
                                        active={
                                            route().current("category.index") ||
                                            route().current("category.index") ||
                                            route().current(
                                                "category.create"
                                            ) ||
                                            route().current("category.edit")
                                        }
                                    >
                                        Category
                                    </NavLink>
                                </div>
                            )}
                            {auth.user_permission.includes("all user") && (
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink
                                        href={route("alluser.index")}
                                        active={
                                            route().current("alluser.index") ||
                                            route().current("alluser.index") ||
                                            route().current("alluser.create") ||
                                            route().current("alluser.edit")
                                        }
                                    >
                                        All User
                                    </NavLink>
                                </div>
                            )}
                            {auth.user_permission.includes("read modul") && (
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink
                                        href={route("modules.index")}
                                        active={
                                            route().current("modules.index") ||
                                            route().current("modules.index") ||
                                            route().current(
                                                "permissions.index"
                                            ) ||
                                            route().current(
                                                "permissions.create"
                                            )
                                        }
                                    >
                                        Modules
                                    </NavLink>
                                </div>
                            )}
                            {auth.user_permission.includes("read role") && (
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink
                                        href={route("roles.index")}
                                        active={
                                            route().current("roles.index") ||
                                            route().current("roles.index") ||
                                            route().current("roles.create") ||
                                            route().current(
                                                "role.permissions.index"
                                            ) ||
                                            route().current(
                                                "manage.role.permissions.index"
                                            )
                                        }
                                    >
                                        Roles
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {auth.user.role_name != "viewer" ? (
                            <ResponsiveNavLink
                                href={route("mypost.index")}
                                active={
                                    route().current("mypost.index") ||
                                    route().current("mypost.create") ||
                                    route().current("mypost.edit")
                                }
                            >
                                {auth.user_permission.includes("all post")
                                    ? "All Post"
                                    : "My Post"}
                            </ResponsiveNavLink>
                        ) : (
                            ""
                        )}
                        {auth.user_permission.includes("owner post") &&
                            auth.user_permission.includes("all post") && (
                                <div className="space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <ResponsiveNavLink
                                        href={route("mypost.adminPost")}
                                        active={
                                            route().current(
                                                "mypost.adminPost"
                                            ) ||
                                            route().current("mypost.adminPost")
                                        }
                                    >
                                        My Post
                                    </ResponsiveNavLink>
                                </div>
                            )}
                        {auth.user_permission.includes("read category") && (
                            <div className=" space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <ResponsiveNavLink
                                    href={route("category.index")}
                                    active={
                                        route().current("category.index") ||
                                        route().current("category.index") ||
                                        route().current("category.create") ||
                                        route().current("category.edit")
                                    }
                                >
                                    Category
                                </ResponsiveNavLink>
                            </div>
                        )}
                        {auth.user_permission.includes("all user") && (
                            <div className=" space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <ResponsiveNavLink
                                    href={route("alluser.index")}
                                    active={
                                        route().current("alluser.index") ||
                                        route().current("alluser.index") ||
                                        route().current("alluser.create") ||
                                        route().current("alluser.edit")
                                    }
                                >
                                    All User
                                </ResponsiveNavLink>
                            </div>
                        )}
                        {auth.user_permission.includes("read modul") && (
                            <div className=" space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <ResponsiveNavLink
                                    href={route("modules.index")}
                                    active={
                                        route().current("modules.index") ||
                                        route().current("modules.index") ||
                                        route().current("permissions.index") ||
                                        route().current("permissions.create")
                                    }
                                >
                                    Modules
                                </ResponsiveNavLink>
                            </div>
                        )}
                        {auth.user_permission.includes("read role") && (
                            <div className=" space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <ResponsiveNavLink
                                    href={route("roles.index")}
                                    active={
                                        route().current("roles.index") ||
                                        route().current("roles.index") ||
                                        route().current("roles.create") ||
                                        route().current(
                                            "role.permissions.index"
                                        ) ||
                                        route().current(
                                            "manage.role.permissions.index"
                                        )
                                    }
                                >
                                    Roles
                                </ResponsiveNavLink>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {auth.user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
