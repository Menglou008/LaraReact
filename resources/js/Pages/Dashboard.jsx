import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    const [search, setSearch] = useState('');
    const subjects = [
        { id: 1, name: 'Mathematics' },
        { id: 2, name: 'Science' },
        { id: 3, name: 'English' },
        { id: 4, name: 'Filipino' },
        { id: 5, name: 'Computer Programming' },
    ];

    const filteredSubjects = subjects.filter((subject) =>
        subject.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-black leading-tight">Student Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-green-400 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header and Search */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Subjects</h3>
                                <input
                                    type="text"
                                    placeholder="Search subjects..."
                                    className="px-3 py-1 border rounded text-sm"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Subject List */}
                            <ul>
                                {filteredSubjects.length > 0 ? (
                                    filteredSubjects.map((subject) => (
                                        <li
                                            key={subject.id}
                                            className="flex items-center justify-between mb-2 bg-white rounded p-2"
                                        >
                                            <span>{subject.name}</span>
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                                onClick={() =>
                                                    alert(`Enrolled in ${subject.name}`)
                                                }
                                            >
                                                Enroll
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-sm text-white">No subjects found.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
