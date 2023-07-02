import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Dashboard/Other/InputError";
import InputLabel from "@/Components/Dashboard/Other/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
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

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register | " />
            <p className="text-3xl text-white text-center font-bold mb-10 mt-7">
                Register
            </p>
            <form onSubmit={submit}>
                <div>
                    <InputLabel className="text-white" forInput="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                                                className="mt-1 block w-full text-white bg-transparent border-t-0 border-x-0 rounded-none focus:ring-white border-b-2 duration-700"

                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2 font-bold" />
                </div>

                <div className="mt-4">
                    <InputLabel className="text-white" forInput="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                                                className="mt-1 block w-full text-white bg-transparent border-t-0 border-x-0 rounded-none focus:ring-white border-b-2 duration-700"

                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2 font-bold" />
                </div>

                <div className="mt-4">
                    <InputLabel className="text-white" forInput="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                                                className="mt-1 block w-full text-white bg-transparent border-t-0 border-x-0 rounded-none focus:ring-white border-b-2 duration-700"

                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2 font-bold" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="password_confirmation"
                        value="Confirm Password" className="text-white"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                                                className="mt-1 block w-full text-white bg-transparent border-t-0 border-x-0 rounded-none focus:ring-white border-b-2 duration-700"

                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 font-bold"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-white w-full rounded-3xl font-bold py-2 mt-10 mb-3 hover:bg-slate-800 hover:text-white"
                >
                    Register
                </button>
                <div className="flex items-center justify-center text-white mb-3 text-sm">
                Already registered?  &nbsp;
                    <Link
                        href={route("login")}
                        className=" text-sm  rounded-md focus:outline-none  text-white hover:underline"
                    >
                        Login Now
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
