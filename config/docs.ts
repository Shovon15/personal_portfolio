
interface Items {
    title: string,
    href: string,
    disabled?: boolean;
    items: Items[],
}

type MainNavItem = {
    title: string;
    href: string;
    disabled?: boolean,
}
type CategoryItem = {
    title: string;
    value: string;
    disabled?: boolean,
}
interface SidebarNavItem {
    title: string;
    items: Items[];
}

interface DocsConfig {
    mainNav: MainNavItem[]
    sidebarNav: SidebarNavItem[]
    category: CategoryItem[]
}

export const docsConfig: DocsConfig = {
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Projects",
            href: "/projects",
        },
        {
            title: "About",
            href: "/about",
        },
        {
            title: "contact",
            href: "/hire-me",
        },
    ],
    sidebarNav: [
        {
            title: "Projects",
            items: [
                {
                    title: "Category Manage",
                    href: "/dashboard/category",
                    items: [],
                },
                {
                    title: "Project Manage",
                    href: "/dashboard/projects",
                    items: [],
                },
                {
                    title: "Contact Manage",
                    href: "/dashboard/contact",
                    items: [],
                    disabled: false,
                },
                {
                    title: "Summary",
                    href: "/students/summary",
                    items: [],
                    disabled: true,
                },
                {
                    title: "Details",
                    href: "/students/details",
                    disabled: true,
                    items: [],
                },
            ],
        },
        // {
        //     title: "Teachers & Staffs",
        //     items: [
        //         {
        //             title: "Teachers",
        //             href: "/teachers",
        //             items: [],
        //         },
        //         {
        //             title: "Registration",
        //             href: "/teachers/teacher-registration",
        //             items: [],
        //         },
        //         {
        //             title: "Staff",
        //             href: "/staffs",
        //             items: [],
        //         },
        //         {
        //             title: "Add Staff",
        //             href: "/staffs/staff-registration",
        //             items: [],
        //         },
        //     ],
        // },
    ],
    category: [
        {
            title: "React js",
            value: "react_js",
            disabled: false
        },
        {
            title: "Node Js",
            value: "node_js",
            disabled: false
        },
        {
            title: "Express Js",
            value: "express_js",
            disabled: false
        },
        {
            title: "Tailwind Css",
            value: "tailwind_css",
            disabled: false
        }
    ]
}