import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [isAdminMode, setIsAdminMode] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    // Clear password when component unmounts
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // Enable keyboard shortcuts for toggling admin mode (desktop)
    useEffect(() => {
        const handler = (e) => {
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
                setIsAdminMode(true);
                alert('Admin login mode activated!');
            }
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'u') {
                setIsAdminMode(false);
                alert('User login mode activated!');
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route(isAdminMode ? 'admin.login' : 'login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
                {isAdminMode ? 'Admin Login' : 'User Login'}
            </h2>

            {/* 🔐 Mobile-friendly admin toggle button */}
            <div className="text-center -mt-4 mb-4">
                <button
                    type="button"
                    onClick={() => setIsAdminMode((prev) => !prev)}
                    className="text-xs text-gray-500 hover:text-red-600 underline"
                >
                    {isAdminMode ? 'Switch to User Login' : 'Are you an Admin?'}
                </button>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} onChange={handleOnChange} />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton
                        className="ml-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                        disabled={processing}
                    >
                        {isAdminMode ? 'Admin Log in' : 'Log in'}
                    </PrimaryButton>
                </div>

                {isAdminMode && (
                    <div className="mt-4 text-center">
                        <Link
                            href={route('admin.register')}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Create Admin Account
                        </Link> 
                    </div>
                )}
            </form>
        </GuestLayout>
    );
}