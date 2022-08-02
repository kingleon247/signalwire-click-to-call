<?php

	namespace App\Http\Controllers;

	use Exception;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\DB;
	use Illuminate\Support\Facades\Http;
	use SignalWire\LaML\VoiceResponse;

	class CallController extends Controller
	{
		private $apiBaseUri;
		public function __construct()
		{
			$this->apiBaseUri = getenv('SIGNALWIRE_API_BASE_URI');
		}

		private function getCallsUrl($spaceUrl, $projectId)
		{
			return "https://" . $spaceUrl . $this->apiBaseUri . "/" . $projectId . "/Calls.json";
		}

		public function index()
		{
			$settings = DB::table('settings')->first();
			$business_number = isset($settings) ? $settings->signalwire_number : '+15555555555';
			// Format numbers for display.
			$formattedNumber = "(" . substr($business_number, 2, 3) . ") " . substr($business_number, 5, 3) . "-" . substr($business_number, 8);
			return response(['numbers' => ['business' => $business_number, 'businessFormatted' => $formattedNumber]]);
		}

		public function calls()
		{
			// Get settings keys from database set on settings page.
			$settings = DB::table('settings')->first();

			// If keys set.
			if (isset($settings)) {
				// Fetch call data.
				$response = Http::withBasicAuth($settings->project_id, $settings->token)
					->get($this->getCallsUrl($settings->space_url, $settings->project_id));
				$data = json_decode($response->body(), true);
				return $data;
				// Handle call data.
				if (isset($data['calls'])) {
					return response($data, 200);
					// Handle not found error.
				} elseif (isset($response['error'])) {
					return response()->json(['error' => $response['error']], $response['status']);
				}
				// Handle unauthorized error.
				return response()->json(['error' => $response->body()], 400);
			} else {
				// Handle keys not set error.
				return response()->json(['error' => 'Missing Keys.'], 400);
			}
		}

		public function incomingCall(Request $request)
		{
			$response = new VoiceResponse();
			$businessName = 'Perfect Painters';
			$defaultGreeting = "Thanks for calling ${businessName}. Please hold while I connect you.";
			// Set greeting to default if none set.
			$greeting = !empty($request->greeting) ? $request->greeting : $defaultGreeting;

			// Greet caller before forwarding to business number.
			$response->say($greeting);

			// Forward call
			$response->dial(
				env('FORWARDING_NUMBER'), // to
				['callerId' => env('SIGNALWIRE_NUMBER')] // from
			);

			return $response;
		}

	}
