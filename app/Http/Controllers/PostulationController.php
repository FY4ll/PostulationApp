<?php

use App\Http\Controllers\Controller;
use App\Models\Postulation;
use Illuminate\Http\Request;

class PostulationController extends Controller
{
    public function store(Request $request)
    {
        // Valider les données du formulaire

        // Enregistrer les données de la postulation
        $postulation = new Postulation();
        $postulation->nom = $request->input('Nom');
        $postulation->prenom = $request->input('Prénom');
        $postulation->mail = $request->input('Mail');
        $postulation->apprentissage = $request->input('Dropdown');
        $postulation->situation = $request->input('Radio');
        $postulation->save();

        // Gérer les fichiers
        if ($request->hasFile('file1')) {
            $cvPath = $request->file('file1')->store('postulations');
            $postulation->cv_path = $cvPath;
        }

        if ($request->hasFile('file2')) {
            $motivationPath = $request->file('file2')->store('postulations');
            $postulation->motivation_path = $motivationPath;
        }

        if ($request->hasFile('file3')) {
            $videoPath = $request->file('file3')->store('postulations');
            $postulation->video_path = $videoPath;
        }

        $postulation->save();

        // Redirection ou réponse JSON appropriée
    }
}
