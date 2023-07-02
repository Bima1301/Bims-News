<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## About Project

This project is called arkatama news. This project is the first task of the internship program held at PT Arkatama Multisolusindo. This project is a news project that can display news and manage it. ( Each user can manage their own posts )

## My Personal Information

-   Name : Yanuar Bimantoro Aji
-   WhatsApp : 082264692531
-   Nim : 205150700111022
-   University : Brawijaya University
-   Home Town : Tulungagung
-   Address : JL.Joyosari GG.1 no 26D , Merjosari, Lowokwaru
-   Internship Expectations : Menjadi mahasiswa yang memiliki keterampilan lebih, menambah pengalaman serta relasi, dan memberikan kontribusi sebaik mungkin terhadap perusahaan

## Technology In Projects

-   **[Laravel 10.0](https://laravel.com/docs/10.x)** | **[Sanctum 3.2](https://laravel.com/docs/10.x/sanctum)** | **[Ziggy 1.0](https://github.com/tighten/ziggy)** | **[Breeze 1.19](https://laravel.com/docs/10.x/starter-kits#breeze)**
-   **[PHP 8.1.10](https://www.php.net/releases/8.1/en.php)** | **[Composer 2.4.4](https://getcomposer.org/)** | **[MySQL 8.0.30](https://www.mysql.com/)**
-   **[Windows 11](https://www.microsoft.com/software-download/windows11)**

-   **[NPM 8.19.2](https://www.npmjs.com/)** | **[Node v16.18.0](https://nodejs.org/en/)** | **[InertiaJS 0.6.3](https://inertiajs.com/)**

-   **[React 18.2.0](https://reactjs.org/)** | **[Axios 1.1.2](https://github.com/axios/axios)** | **[Vite 4.0.0](https://vitejs.dev/)**
-   **[TailwindCSS 3.2.1](https://tailwindcss.com/)** | **[TinyMCE 4.3.0](https://www.tiny.cloud/)** | **[Daisy UI 2.50.2](https://daisyui.com/)** | **[dateformat 5.0.3](https://www.npmjs.com/package/dateformat)** | **[Ant Design 5.2.2](https://ant.design/)** | **[react-highlight-words 0.20.0](https://www.npmjs.com/package/react-highlight-words)**

## Installation

### Clone Repository

```bash
git clone https://gitlab.com/bima.aji1380/pre-assignment-fe3-arkatama.git
```

### Install Dependencies

```bash
composer install
npm install
```

### Create .env file

```bash
cp .env.example .env
```

### Generate Application Key

```bash
php artisan key:generate
```

### Create Database

Create database with name `arkatama_day1` and then run this command to migrate database

```bash
php artisan migrate
```

### Create Storage Link

```bash
php artisan storage:link
```

### Run Project

```bash
php artisan serve
npm run dev
```

## Usage

### Landing Page

Is the page that appears first
![alt text](/Documentation/Landing.png)

### Register

Register to get access to the dashboard

![alt text](/Documentation/Register.png)

### Login

Login to get access to the dashboard

![alt text](/Documentation/Login.png)

### Dashboard

Dashboard is the main page of the application after login

![alt text](/Documentation/Dashboard.png)

### Create Post

Create post to add new post, you can add title, content, category, and publish at for the post

![alt text](/Documentation/Dashboard_create_post.png)

### Edit Post

Edit post to edit the post, you can edit title, content, category, and publish at for the post

![alt text](/Documentation/Dashboard_edit_post.png)

### Delete Post

Delete post to delete the post

![alt text](/Documentation/Dashboard_delete_post.png)

### List Post (Contributor)

List post to show all post that you have created

![alt text](/Documentation/Dashboard_list_post.png)

### List Post (Admin)

List post to show all post that admin can publish or not

![alt text](/Documentation/Dashboard_Admin_List.png)

### List Category (Admin)

List categories to show all category and admin can create read update and delete

![alt text](/Documentation/Dashboard_categories.png)

### List User (Admin)

List user to see the users who have registered. Admin can change user role between contributor and viewer

![alt text](/Documentation/Dashboard_alluser.png)

### List Modules (Admin)

List modules to see the modules that have been created. Admin can create, read, update, and delete modules

![alt text](/Documentation/Dashboard_list_modules.jpeg)

### List Modules Permission (Admin)

List modules permission to see the modules permission that have been created

![alt text](/Documentation/Dashboard_list_modules_permission.jpeg)

### Manage Modules Permission (Admin)

Manage modules permission to see the modules permission that have been created. Admin can create, read, update, and delete modules permission

![alt text](/Documentation/Dashboard_manage_modules_permission.jpeg)
### List Roles (Admin)

List roles to see the roles that have been created. Admin can create, read, update, and delete roles

![alt text](/Documentation/Dashboard_list_roles.jpeg)
### List Role Permission (Admin)

List role permission to see the role permission that have been created

![alt text](/Documentation/Dashboard_list_roles_permissions.jpeg)
### Manage Role Permission (Admin)

Manage role permission to see the role permission that have been created. Admin can create, read, update, and delete role permission

![alt text](/Documentation/Dashboard_manage_roles_permissions.jpeg)

### Show Post (Dashboard)

Show post is the page from dashboard to show the post that you have created

![alt text](/Documentation/Dashboard_show_post.png)

### Show Post (User)

Show post is the page from main to show the post that you have clicked

![alt text](/Documentation/Show_post.png)

### Comments Section (User)

The comments section is the section where users who have registered and logged in can comment on the news

![alt text](/Documentation/Comment.png)

## Database

### ER Diagram

![alt text](/Documentation/Er_Diagram.png)

### Database Schema

[Database Schema File](/Documentation/arkatama_day1.sql).

### User Access

Just have one admin and user can register to become viewer(can only comment). Admin can change the role of user

#### Admin

```bash
Email : bima@gmail.com
Password : 123123123
```

#### User 1 Contributor

```bash
Email : contributor@gmail.com
Password : 123123123
```

#### User 2 Viewer

```bash
Email : viewer@gmail.com
Password : 123123123
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
