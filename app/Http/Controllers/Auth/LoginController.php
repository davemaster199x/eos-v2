<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return view('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            switch ($user->user_role) {
                case 'Elite':
                    // return redirect()->route('elite.dashboard');
                    return redirect()->intended('elite/dashboard');
                case 'Providers':
                    // return redirect()->route('uploads.dashboard');
                    return redirect()->intended('uploads/dashboard');
                case 'Law Firms':
                    // return redirect()->route('referrals.dashboard');
                    return redirect()->intended('referrals/dashboard');
                default:
                    return redirect('/');
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
