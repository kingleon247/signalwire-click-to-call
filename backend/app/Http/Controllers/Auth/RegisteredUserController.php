<?php

	namespace App\Http\Controllers\Auth;

	use App\Http\Controllers\Controller;
	use App\Models\Settings;
	use App\Models\User;
	use Illuminate\Auth\Events\Registered;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\Auth;
	use Illuminate\Support\Facades\DB;
	use Illuminate\Support\Facades\Hash;
	use Illuminate\Validation\Rules;

	class RegisteredUserController extends Controller
	{
		/**
		 * Handle an incoming registration request.
		 *
		 * @param \Illuminate\Http\Request $request
		 * @return \Illuminate\Http\Response
		 *
		 * @throws \Illuminate\Validation\ValidationException
		 */
		public function store(Request $request)
		{
			// This logic prevents multiple users from being created.
			// By default new users default to non admin users at database level.
			// First user created will be set to admin.
			// All other user registry attempts will receive an unauthorized request message.

			// Check if user exists. If so, return error message.
			$adminExists = DB::table('users')->whereIsAdmin(true)->exists();
			if($adminExists) {
				return response([
					"message" => "This request is unauthorized.",
					"errors" => [
						"This request is unauthorized."
					]
				], 422);
			}

			// Else, begin new admin user registry.
			$request->validate([
				'name' => ['required', 'string', 'max:255'],
				'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
				'password' => ['required', 'confirmed', Rules\Password::defaults()],
			]);

			$user = User::create([
				'name' => $request->name,
				'email' => $request->email,
				'password' => Hash::make($request->password),
				// Set user to admin
				'is_admin' => true
			]);

			event(new Registered($user));

			Auth::login($user);

			return response()->noContent();
		}
	}
