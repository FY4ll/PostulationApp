import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import React from 'react';

export default function MesPostulation({auth}) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes Préavis</h2>}
        >
            <Head title="Mes Préavis"/>
            <h1> hello world</h1>
        </AuthenticatedLayout>
    );
}
