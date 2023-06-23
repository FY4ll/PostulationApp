<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 ce controlleur permet d'edit les postulation via un compte de type postulant
*/
class getpostulationInfo extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */

    // postulant request
    public function show_postulant(Request $request)
    {
        /**  Permet de juste récupererles infromations du tableaux */
        if (!request("postulation_id")) {
            $userId = request('user_id');
            return DB::table('postulation_user')
                ->select('postulations.apprentissage', 'postulations.created_at', 'postulations.updated_at', 'postulations.avancement_postulation', 'postulation_user.user_id', 'postulations.id')
                ->join('postulations', 'postulations.id', '=', 'postulation_user.postulation_id')
                ->where('postulation_user.user_id', $userId)
                ->get();
            /**  Permet d'envoyer toutes les infromations pour le formulaire d'édition */
        } elseif (request("postulation_id")) {
            $userId = request('user_id');
            $postulationId = request('postulation_id');
            return DB::table('postulation_user')
                ->select('postulations.*', 'postulation_user.user_id')
                ->join('postulations', 'postulations.id', '=', 'postulation_user.postulation_id')
                ->where('user_id', $userId)
                ->where('postulations.id', $postulationId)
                ->get();
        } else {
            return "Requete invalide";
        }
    }
    // colaborateur request
    public function show_colaborateur_all_postulation()
    {
        return DB::table('users')
            ->select(DB::raw('GROUP_CONCAT(users.name SEPARATOR ", ") as preavis'), 'postulations.*')
            ->join('postulations_preavis', 'users.id', '=', 'postulations_preavis.colab_id')
            ->join('postulations', 'postulations_preavis.postulation_id', '=', 'postulations.id')
            ->whereColumn('colab_id', '=', 'users.id')
            ->groupBy('postulations.id')
            ->get();
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $postulation = request('postulation_id');
        DB::table('postulations')
            ->where('id', $postulation)
            ->update([
                'nom' => request('name'),
                'prenom' => request('prenom'),
                'mail' => request('mail'),
                'updated_at' => DB::raw('CURRENT_TIMESTAMP')
            ]);

        DB::table('postulation_user')
            ->where('postulation_id', $postulation)
            ->update([
                'updated_at' => DB::raw('CURRENT_TIMESTAMP')
            ]);

    }
    public function download(Request $request)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): void
    {
        $postulation = Request('postulation_id');
        DB::table('postulation_user')
            ->where('postulation_id', $postulation)
            ->delete();
        DB::table('postulations')
            ->where('id', $postulation)
            ->delete();

    }
}
