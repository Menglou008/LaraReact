import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        teacher_id: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/admin/register');
    };

    return (
        <GuestLayout>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
                <h2 className="text-xl font-bold mb-4 text-center">Admin Registration</h2>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="Full Name" />
                        <TextInput id="name" name="name" value={data.name} onChange={handleChange} required />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="teacher_id" value="Teacher ID" />
                        <TextInput id="teacher_id" name="teacher_id" value={data.teacher_id} onChange={handleChange} required />
                        <InputError message={errors.teacher_id} className="mt-1" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput id="email" type="email" name="email" value={data.email} onChange={handleChange} required />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput id="password" type="password" name="password" value={data.password} onChange={handleChange} required />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} onChange={handleChange} required />
                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>

                    <PrimaryButton className="w-full" disabled={processing}>Register</PrimaryButton>
                </form>
            </div>
        </GuestLayout>
    );
}
