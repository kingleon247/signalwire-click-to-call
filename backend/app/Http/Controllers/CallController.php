<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CallController extends Controller
{
    public function index() {
        $sid = getenv("SIGNALWIRE_PROJECT_ID_BFF");
        $token = getenv("SIGNALWIRE_API_BFF_PORTAL_TOKEN_FULL_BFF");
        $space = getenv('SIGNALWIRE_SPACE_URL_BFF');
        $mainUri = "https://${space}/api/laml/2010-04-01/Accounts";

        // $spaceArray = array("signalwireSpaceUrl" => env('SIGNALWIRE_SPACE_URL_BFF'));
        // $client = new Client($sid, $token, $spaceArray);
        // $calls = [];
        // foreach($client->recordings->page() as $call) { $calls[] = $call->toArray(); }


        $response = Http::withBasicAuth($sid, $token)->get("${mainUri}/${sid}/Calls.json");

        $calls = json_decode($response->getBody());
//		return $calls->calls;
//
//		dd($calls);
    }
}
