<?php

use App\Http\Controllers\getpostulationInfo;
use App\Http\Controllers\PostulationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/postulation', [PostulationController::class, 'store']);

Route::get('/user/postulations/count', function (Request $request) {
    $userId = $request->query('user_id');
    $postCounter = DB::table('postulation_user')->where('user_id' ,'=', $userId)->count();
    return response()->json(['numPostulations' => $postCounter]);
});

Route::get('/test_api', [getpostulationInfo::class, 'show']);

