import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import MainCard from '@/ui-component/cards/MainCard';
import MainLayout from '@/Layouts/MainLayout/MainLayout';

export default function Edit(props) {
    const mustVerifyEmail = props.mustVerifyEmail;
    const status = props.status;
    return (
        <MainLayout props={props}>
            <MainCard>
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
            <Head title="Profile" />

            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
            </MainCard>
        </MainLayout>
    );
}
