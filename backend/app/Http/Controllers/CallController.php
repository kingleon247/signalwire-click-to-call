<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use SignalWire\LaML\VoiceResponse;
use SignalWire\Rest\Client;
use Twilio\Exceptions\ConfigurationException;
use Twilio\Exceptions\TwilioException;
use Twilio\Http\Response;

class CallController extends Controller
{
    private $projectId;
    private $token;
    private $spaceUrl;
    private $apiBaseUri;
    private $apiMainUrl;
    private $apiCallsUrl;

    public function __construct()
    {
        $this->projectId = getenv("SIGNALWIRE_PROJECT_ID");
        $this->token = getenv("SIGNALWIRE_TOKEN");
        $this->spaceUrl = getenv('SIGNALWIRE_SPACE_URL');
        $this->apiBaseUri = getenv('SIGNALWIRE_API_BASE_URI');
        $this->apiMainUrl = "https://" . $this->spaceUrl . $this->apiBaseUri . "/" . $this->projectId;
        $this->apiCallsUrl = $this->apiMainUrl . "/Calls.json";
    }

    public function calls() {
        $response = Http::withBasicAuth($this->projectId, $this->token)->get($this->apiCallsUrl);
        return json_decode($response);
    }

    public function incomingCall(Request $request) {
        $response = new VoiceResponse();
        $businessName = 'Perfect Painters';
        $defaultGreeting = "Thanks for calling ${businessName}. Please hold while I connect you.";
        // Set greeting to default if none set.
        $greeting = !empty($request->greeting) ? $request->greeting : $defaultGreeting;

        // Greet caller before forwarding to business number
        $response->say($greeting);

        // Forward call
        $response->dial(
            env('FORWARDING_NUMBER'), // to
            [ 'callerId' => env('SIGNALWIRE_NUMBER') ] // from
        );

        return $response;
    }

}

