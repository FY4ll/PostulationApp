<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

# Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

# Modification du profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

# Formulaire de postulation
Route::get('/postulation', function () {
    $user = Auth::user(); // Récupérer l'utilisateur authentifié
    return Inertia::render('Postulation/Postulation', [
        'user' => $user, // Passer les informations de l'utilisateur à votre composant React
    ]);
})->middleware(['auth', 'verified'])->name('postulation');

# mespostulationpage
Route::get('/mespostulation', function () {
    return Inertia::render('Postulation/Mespostulation');
})->middleware(['auth', 'verified'])->name('mespostulation');

# preavis postulation page (collaborateur)
Route::get('/postulation_preavis', function () {
    return Inertia::render('Postulation/colab_postulation/preavis/postulation_preavis');
})->middleware(['auth', 'verified'])->name('postulation_preavis');

// preavis formulaire
Route::get('/postulation_preavis/forms', function () {
    return Inertia::render('Postulation/colab_postulation/preavis/preavis_forms');
})->middleware(['auth', 'verified'])->name('postulation_preavis/forms');


require __DIR__ . '/auth.php';
