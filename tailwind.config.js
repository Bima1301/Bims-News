const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    purge:{
        content: [
            './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
            './storage/framework/views/*.php',
            './resources/views/**/*.blade.php',
            './resources/js/**/*.jsx',
            // '!./resources/js/Layouts/MainLayout/**/*.jsx',
        ],
    },

    theme: {
        // screens: {
        //     'tablet': '640px',
        //     // => @media (min-width: 640px) { ... }
      
        //     'laptop': '1024px',
        //     // => @media (min-width: 1024px) { ... }
      
        //     'desktop': '1280px',
        //     // => @media (min-width: 1280px) { ... }
        //   },
        container : {
            center : true,
            // padding: '2rem',
        },
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('@tailwindcss/forms') , require("daisyui")],
    daisyui: {
        themes: false,
      },
};
