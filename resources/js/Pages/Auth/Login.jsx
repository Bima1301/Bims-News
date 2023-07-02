import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Dashboard/Other/InputError";
import InputLabel from "@/Components/Dashboard/Other/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in |" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <p className="text-3xl text-white text-center font-bold mb-10 mt-7">
                Login
            </p>
            <form onSubmit={submit}>
                <div className="relative">
                    <InputLabel
                        forInput="email"
                        value="Email"
                        className="text-white"
                    />
                    <EmailIcon className="text-white absolute right-0 md:mt-3 md:mr-3 scale-125" />
                
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full focus:bg-transparent text-white bg-transparent border-t-0 border-x-0 rounded-none focus:ring-white border-b-2 duration-700"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2 font-bold" />
                </div>

                <div className="mt-4 relative">
                    <InputLabel
                        forInput="password"
                        value="Password"
                        className="text-white"
                    />
                    <LockIcon className="text-white absolute right-0 md:mt-3 md:mr-3 scale-125" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-white bg-transparent border-t-0 border-x-0 rounded-none focus:ring-white border-b-2 duration-700"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2 font-bold" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />
                        <span className="ml-2 text-sm text-white">
                            Remember me
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-white w-full rounded-3xl font-bold py-2 my-5 hover:bg-slate-800 hover:text-white "
                >
                    Login
                </button>

                <div className="flex items-center justify-center mt-4 text-white mb-10 text-sm">
                    Don't have an account? &nbsp;
                    <Link href={route("register")} className="text-sm text-white hover:underline    ">
                        Register now !
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
