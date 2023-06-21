<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 ce controlleur permet de faire les inner join pour inserer les données dans le tableau contenu dans Mespostulation
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
    public function show(Request $request)
    {
        /**  Permet de juste récupererles infromations du tableaux */
        if(!request("postulation_id")){
            $userId = request('user_id');
            return DB::table('postulation_user')
                ->select('postulations.apprentissage', 'postulations.created_at', 'postulations.updated_at', 'postulations.avancement_postulation', 'postulation_user.user_id')
                ->join('postulations', 'postulations.id', '=', 'postulation_user.postulation_id')
                ->where('postulation_user.user_id', $userId)
                ->get();
            /**  Permet d'envoyer toutes les infromations pour le formulaire d'édition */
        }elseif (request("postulation_id")){
            $userId = request('user_id');
            $postulationId = request('postulation_id');
            return DB::table('postulation_user')
                ->select('postulations.*', 'postulation_user.user_id')
                ->join('postulation_user', 'postulations.id', '=', 'postulation_user.postulation_id')
                ->where('user_id', $userId)
                ->where('postulations.id', $postulationId)
                ->get();
        }else{
            return "Requete invalide";
        }
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
