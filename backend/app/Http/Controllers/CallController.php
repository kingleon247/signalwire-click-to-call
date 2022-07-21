<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use SignalWire\Rest\Client;
use Twilio\Exceptions\ConfigurationException;

class CallController extends Controller
{
    public function index() {
        $sid = getenv("SIGNALWIRE_PROJECT_ID");
        $token = getenv("SIGNALWIRE_TOKEN");
        $space = getenv('SIGNALWIRE_SPACE_URL');
        $mainUri = "https://${space}/api/laml/2010-04-01/Accounts";

        // {"uri":"/api/laml/2010-04-01/Accounts/c74baf17-d94d-4905-9f83-2888a4f4f885/Calls?Page=0\u0026PageSize=50","first_page_uri":"/api/laml/2010-04-01/Accounts/c74baf17-d94d-4905-9f83-2888a4f4f885/Calls?Page=0\u0026PageSize=50","next_page_uri":null,"previous_page_uri":null,"page":0,"page_size":50,"calls":[]}

        // $spaceArray = array("signalwireSpaceUrl" => env('SIGNALWIRE_SPACE_URL'));
        // $client = new Client($sid, $token, $spaceArray);
        // $calls = [];
        // foreach($client->recordings->page() as $call) { $calls[] = $call->toArray(); }


        $response = Http::withBasicAuth($sid, $token)->get("${mainUri}/${sid}/Calls.json");
        return $response;
//
//        $calls = json_decode($response->getBody());
//		return $calls->calls;
//
//		dd($calls);

        return 'hello from calls';
    }


    public function incomingCall() {
        try {
            $client = new Client('your-project', 'your-token', array("signalwireSpaceUrl" => "example.signalwire.com"));
        } catch (ConfigurationException $e) {
            return 'error';
        }

        // You can then use $client to make calls, send messages, and more.
        return 'incoming call';
    }
}
