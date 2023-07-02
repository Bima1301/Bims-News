// material-ui
import { Typography } from "@mui/material";
import { IconDashboard, IconNews, IconNotebook, IconTags, IconUserExclamation, IconUsers, IconWallpaper } from '@tabler/icons';
import { IconKey } from '@tabler/icons';

// project imports
import NavGroup from "./NavGroup";
// import menuItem from "@/menu-items";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = ({props}) => {
    console.log("menulist", props);

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard =  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: IconDashboard,
            breadcrumbs: false
        },
        props.auth.user_permission.includes("all post")  ? {
            id: 'adminpost',
            title: 'My Post',
            type: 'item',
            url: '/dashboard/mypost/adminPost',
            icon: IconNews,
            breadcrumbs: false
        } : {
            id: 'mypost',
            title: 'My Post',
            type: 'item',
            url: '/dashboard/mypost',
            icon: IconNews,
            breadcrumbs: false
        }
    ]
};



// ==============================|| EXTRA management MENU ITEMS ||============================== //
let title = ''
if (props.auth.user_permission.includes("all post")) {
    title = 'management'
}
const management = {
    id: 'management',
    title: title,
    type: 'group',
    children: [
        props.auth.user_permission.includes("all post") && { 
            id:'allpost',
            title:'All Post',
            type:'item',
            url: '/dashboard/mypost',
            icon: IconNotebook,
            breadcrumbs: false
        },
        props.auth.user_permission.includes("read category") && { 
            id:'category',
            title:'Category',
            type:'item',
            url: route('category.index'),
            icon: IconTags,
            breadcrumbs: false
        },
        props.auth.user_permission.includes("all post") && props.auth.user_permission.includes("approve post") && {
            id: 'configuration',
            title: 'Configuration',
            type: 'collapse',
            icon: IconKey,
            children: [
                {
                    id: 'alluser',
                    title: 'All User',
                    type: 'item',
                    url: route("alluser.index"),
                    target: true,
                    icon: IconUsers,
                },
                {
                    id: 'module',
                    title: 'Modules',
                    type: 'item',
                    url: route("modules.index"),
                    target: true,
                    icon: IconWallpaper,
                },
            {
                id: 'role',
                title: 'Roles',
                type: 'item',
                url: route("roles.index"),
                target: true,
                icon: IconUserExclamation,
            },
            ]
        }
    ]
};

const menuItems = {
    items: [dashboard, management]
};
const propss = props;
    // console.log("menu list",props);
    const navItems = menuItems.items.map((item) => {
        switch (item.type) {
            case "group":
                return <NavGroup props={propss} key={item.id} item={item} />;
            // default:
            //     return (
            //       <>
            //         <Typography
            //             key={item.id}
            //             variant="h6"
            //             color="error"
            //             align="center"
            //         >
            //             Menu Items Error
            //         </Typography>
            //       </>
            //     );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
