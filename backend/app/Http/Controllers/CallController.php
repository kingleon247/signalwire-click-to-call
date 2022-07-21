<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use SignalWire\LaML;
use SignalWire\LaML\VoiceResponse;
use SignalWire\Rest\Client;
use Twilio\Exceptions\ConfigurationException;
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

    public function index() {
        //
    }

    public function incomingCall() {
        try {
            $client = new Client($this->projectId, $this->token, array("signalwireSpaceUrl" => $this->spaceUrl));
        } catch (ConfigurationException $e) {
            return $e;
        }

        $response = new VoiceResponse();

        // Now use $response like you did before!
        $response->say('Hey, welcome to SignalWire!');


        return $response;
    }

    public function listCalls() {
        $response = Http::withBasicAuth($this->projectId, $this->token)->get($this->apiCallsUrl);
        return json_decode($response);;
        return $response['calls'];
    }
}

