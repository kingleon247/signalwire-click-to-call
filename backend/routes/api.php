<?php

	use App\Http\Controllers\Auth\AuthenticatedSessionController;
	use App\Http\Controllers\Auth\EmailVerificationNotificationController;
	use App\Http\Controllers\Auth\NewPasswordController;
	use App\Http\Controllers\Auth\PasswordResetLinkController;
	use App\Http\Controllers\Auth\RegisteredUserController;
	use App\Http\Controllers\Auth\VerifyEmailController;
	use App\Http\Controllers\CallController;
	use App\Http\Controllers\SettingsController;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\Route;

	/*
	|--------------------------------------------------------------------------
	| API Routes
	|--------------------------------------------------------------------------
	|
	| Here is where you can register API routes for your application. These
	| routes are loaded by the RouteServiceProvider within a group which
	| is assigned the "api" middleware group. Enjoy building your API!
	|
	*/

	Route::middleware(['auth:sanctum'])->group(function () {
		Route::get('/user', function (Request $request) {
			return $request->user();
		});

		Route::post('/register', [RegisteredUserController::class, 'store'])
			->middleware('guest')
			->name('register');

		Route::post('/login', [AuthenticatedSessionController::class, 'store'])
			->middleware('guest')
			->name('login');

		Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
			->middleware('guest')
			->name('password.email');

		Route::post('/reset-password', [NewPasswordController::class, 'store'])
			->middleware('guest')
			->name('password.update');

		Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
			->middleware(['auth', 'signed', 'throttle:6,1'])
			->name('verification.verify');

		Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
			->middleware(['auth', 'throttle:6,1'])
			->name('verification.send');

		Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
			->middleware('auth')
			->name('logout');

		Route::post('/calls', [CallController::class, 'Calls'])
			->middleware('auth')
			->name('calls');

		Route::post('/incoming-call', [CallController::class, 'incomingCall'])->name('incomingCall');


		Route::get('/settings/edit', [SettingsController::class, 'edit'])
			//	->middleware('auth')
			->name('settings.edit');

		Route::patch('/settings/update', [SettingsController::class, 'update'])
			//	->middleware('update')
			->name('settings.update');



	});
	Route::get('/settings/business-number', [CallController::class, 'index'])
		//	->middleware('update')
		->name('call.index');
