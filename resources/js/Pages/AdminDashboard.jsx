import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin!</h1>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
