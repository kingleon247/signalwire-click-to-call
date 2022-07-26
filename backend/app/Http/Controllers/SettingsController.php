<?php

	namespace App\Http\Controllers;

	use App\Models\Settings;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\Auth;
	use Illuminate\Support\Facades\DB;

	class SettingsController extends Controller
	{
		/**
		 * Show the form for editing the specified resource.
		 *
		 * @param \App\Models\Settings $settingsModel
		 * @return \Illuminate\Http\Response
		 */
		public function edit(Settings $settingsModel)
		{
			return Settings::whereUserId(Auth::id())->get();
		}

		/**
		 * Update the specified resource in storage.
		 *
		 * @param \Illuminate\Http\Request $request
		 * @return \Illuminate\Http\Response
		 */
		public function update(Request $request)
		{
			$request->validate([
				'forwarding_number' => ['required', 'string', 'size:12', 'starts_with:+'],
				'signalwire_number' => ['required', 'string', 'size:12', 'starts_with:+'],
				'project_id' => ['required', 'string'],
				'space_url' => ['required', 'string'],
				'token' => ['required', 'string'],
			]);

			$userId = Auth::id();

			$updatedSettings = Settings::updateOrCreate(
				['user_id' => $userId],
				[
					'forwarding_number' => $request->forwarding_number,
					'signalwire_number' => $request->signalwire_number,
					'project_id' => $request->project_id,
					'space_url' => $request->space_url,
					'token' => $request->token
				]
			);

			return response([
				'forwarding_number' => $updatedSettings->forwarding_number,
				'project_id' => $updatedSettings->project_id,
				'signalwire_number' => $updatedSettings->signalwire_number,
				'space_url' => $updatedSettings->space_url,
				'token' => $updatedSettings->token
			]);
		}
	}
