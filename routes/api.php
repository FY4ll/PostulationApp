<?php

use App\Http\Controllers\getpostulationInfo;
use App\Http\Controllers\PostulationController;
use App\Http\Controllers\role_user_controller;
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

// crud table postulation_user
Route::get('/postulation_user/select', [getpostulationInfo::class, 'show_postulant']);
Route::get('/postulation_user/select/colaborateur', [getpostulationInfo::class, 'show_colaborateur_all_postulation']);
Route::post('/postulation_user/save', [getpostulationInfo::class, 'update']);
Route::post('/postulation_user/delete', [getpostulationInfo::class, 'destroy']);
// crud table role_user
Route::get('/user_role/select', [role_user_controller::class, 'show']);

//route de download des fichier
Route::get('/postulation/download/colaborateur', function () {
    $cheminFichier = storage_path('postulations/test_zest_LM.pdf');
    $nomFichier = 'test_zest_LM.pdf';
    return response()->download($cheminFichier, $nomFichier);
});




