/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from '../../layout/Navbar/Navbar';
import Footer from '../../layout/Footer/Footer';

const SecuritySettings = () => {
return (
    <>
    <Navbar />
    <div className="container mx-auto p-4 py-20">
        <h1 className="text-3xl font-bold mb-6">Security Settings</h1>
        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        {/* Change Password Section */}
        <div className="w-full md:w-1/2 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <form>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <a href="#" className="text-sm text-blue-500 mt-2 block hover:underline">Forgot password?</a>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">One-Time Password</label>
                <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
                type="submit"
                className=" w-Max py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Get Password
            </button>
            <p className="text-sm text-gray-600 mt-4">
                Vous avez activé l’authentification à deux facteurs, vous devrez donc également entrer le code de vérification à 6 chiffres de votre application d’authentification mobile comme Google Authenticator ou 1Password, ou utiliser un code de récupération précédemment enregistré.
            </p>
            </form>
        </div>
        {/* Two-Factor Authentication Section */}
        <div className="w-full md:w-1/2 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">Two-Factor Authentication is <span className="text-green-500">enabled</span></h2>
            <div className="flex space-x-4 mb-6">
            <button className="w-1/2 py-2 bg-green-200 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                View Recovery Codes
            </button>
            <button className="w-1/2 py-2 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Disable 2FA
            </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
            Si vous utilisez des produits JetBrains non récents et qu’ils vous invitent à saisir un mot de passe à usage unique, utilisez App Password au lieu de votre mot de passe habituel pour vous connecter.
            </p>
            <button className="w-max py-2 px-4 bg-green-500 text-white text-700 font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500  ">
            Get App Password
            </button>
        </div>
        </div>
    </div>
    <Footer />
    </>
);
};

export default SecuritySettings;