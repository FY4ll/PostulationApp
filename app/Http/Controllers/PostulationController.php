<?php

namespace App\Http\Controllers;


use App\Models\Postulation;
use App\Models\PostulationUser;
use Illuminate\Http\Request;

class PostulationController extends Controller
{
    public function store(Request $request)
    {
        // Valider les données du formulaire
        $request->validate([
            'Nom' => 'required',
            'Prenom' => 'required',
            'Mail' => 'required|email',
            'Apprentissage' => 'required',
            'situation' => 'required',
            'file1' => 'file',
            'file2' => 'file',
            'file3' => 'file',
        ]);

        // Enregistrer les données de la postulation
        $postulation = new Postulation();
        $postulation->nom = $request->input('Nom');
        $postulation->prenom = $request->input('Prenom');
        $postulation->mail = $request->input('Mail');
        $postulation->apprentissage = $request->input('Apprentissage');
        $postulation->situation = $request->input('situation');

        // Gérer les fichiers
        if ($request->hasFile('file1')) {
            $cvFile = $request->file('file1');
            $cvFileName = $request->input('Nom') . '_' . $request->input('Prenom') . "_CV." . $cvFile->getClientOriginalExtension();
            $cvFilePath = $cvFile->storeAs($cvFileName);
            $postulation->cv_path = $cvFilePath;
        }

        if ($request->hasFile('file2')) {
            $motivationFile = $request->file('file2');
            $motivationFileName = $request->input('Nom') . '_' . $request->input('Prenom') . "_LM." . $motivationFile->getClientOriginalExtension();
            $motivationFilePath = $motivationFile->storeAs($motivationFileName);
            $postulation->motivation_path = $motivationFilePath;
        }

        if ($request->hasFile('file3')) {
            $videoFile = $request->file('file3');
            $videoFileName = $request->input('Nom') . '_' . $request->input('Prenom') . "_VM." . $videoFile->getClientOriginalExtension();
            $videoFilePath = $videoFile->storeAs($videoFileName);
            $postulation->video_path = $videoFilePath;
        }
        $postulation->save();

        $user_id = $request->input('id');
        $postulation_user = new PostulationUser();
        $postulation_user->postulation_id = $postulation->id;
        $postulation_user->user_id = $user_id;

        $postulation_user->save();


       return redirect('/dashboard');
    }
}
