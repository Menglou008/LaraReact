<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    // ✅ Show the admin registration form
    public function showRegisterForm()
    {
        return Inertia::render('Auth/Register'); // Match: resources/js/Pages/Auth/Register.jsx
    }

    // ✅ Handle admin registration
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'teacher_id' => 'required|string|max:20',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|confirmed|min:8',
        ]);

        Admin::create([
            'name' => $request->name,
            'teacher_id' => $request->teacher_id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('admin.login.form')->with('status', 'Admin account created successfully!');
    }

    // ✅ Show admin login form
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login'); // Match: resources/js/Pages/Auth/Login.jsx
    }

    // ✅ Handle admin login submission
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials)) {
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }

    // ✅ Show the admin dashboard
    public function dashboard()
    {
        return Inertia::render('AdminDashboard'); // Match: resources/js/Pages/AdminDashboard/Dashboard.jsx
    }

    // ✅ Optional: Logout
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login.form');
    }
}
