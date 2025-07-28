import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        student_id: '',
        course: '',
        year_level: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-center text-red-700 mb-6">Create an Account</h2>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full border border-pink-400"
                            autoComplete="name"
                            isFocused={true}
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="student_id" value="Student ID" />
                        <TextInput
                            id="student_id"
                            name="student_id"
                            value={data.student_id}
                            className="mt-1 block w-full border border-pink-400"
                            autoComplete="student-id"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.student_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="course" value="Course" />
                        <TextInput
                            id="course"
                            name="course"
                            value={data.course}
                            className="mt-1 block w-full border border-pink-400"
                            onChange={handleOnChange}
                            required
                    />
                        <InputError message={errors.course} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="year_level" value="Year Level" />
                        <TextInput
                            id="year_level"
                            name="year_level"
                            value={data.year_level}
                            className="mt-1 block w-full border border-pink-400"
                            onChange={handleOnChange}
                            required
                    />
                        <InputError message={errors.year_level} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border border-pink-400"
                            autoComplete="username"
                            onChange={handleOnChange}
                            required
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
                            className="mt-1 block w-full border border-pink-400"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border border-pink-400"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={route('login')}
                            className="text-sm text-red-700 hover:underline"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton
                            className="ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                            disabled={processing}
>
                            Register
                        </PrimaryButton>

                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
