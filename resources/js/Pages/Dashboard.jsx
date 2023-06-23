import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Recap from '../Components/postulation/recap'; // Chemin vers votre fichier contenant le composant Recap
import React from "react";

export default function Dashboard({auth}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <Recap auth={auth}/>
        </AuthenticatedLayout>
    );
}
