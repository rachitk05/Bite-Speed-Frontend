import React, { useState } from 'react';
import { Github, Link, FileText, Send, Loader2 } from 'lucide-react';

const Identify = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://bite-speed-backend.onrender.com/identify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phoneNumber }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'An error occurred while processing your request.');
            }
            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again later.');
            console.error('Error details:', err);
        } finally {
            setLoading(false);
        }
    };
    const renderJsonValue = (value) => {
        if (Array.isArray(value)) {
            return (
                <span className="text-green-600">
                    [
                    {value.map((item, index) => (
                        <span key={index}>
                            {renderJsonValue(item)}
                            {index < value.length - 1 && ', '}
                        </span>
                    ))}
                    ]
                </span>
            );
        } else if (typeof value === 'object' && value !== null) {
            return renderJsonObject(value);
        } else if (typeof value === 'string') {
            return <span className="text-green-600">"{value}"</span>;
        } else {
            return <span className="text-blue-600">{JSON.stringify(value)}</span>;
        }
    };

    const renderJsonObject = (obj, level = 0) => {
        return (
            <div style={{ marginLeft: `${level * 20}px` }}>
                {'{'}
                {Object.entries(obj).map(([key, value], index, array) => (
                    <div key={key} className="ml-4">
                        <span className="text-purple-600">"{key}"</span>: {renderJsonValue(value)}
                        {index < array.length - 1 && ','}
                    </div>
                ))}
                {'}'}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 space-y-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-800 ">Bite Speed <br/>Identity Reconciliation</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                <span>Identify</span>
                            </>
                        )}
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {response && (
                    <div className="mt-8 space-y-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Response:</h2>
                        <div className="bg-gray-100 p-6 rounded-lg overflow-x-auto">
                            <pre className="text-sm sm:text-base font-mono">
                                {renderJsonObject(response)}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                    href="https://github.com/rachitk05/Bite-Speed-Backend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition duration-200"
                >
                    <Github size={24} />
                    <span>GitHub</span>
                </a>
                <a
                    href="https://bite-speed-backend.onrender.com/identify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition duration-200"
                >
                    <Link size={24} />
                    <span>Backend API</span>
                </a>
                <a
                    href="https://drive.google.com/file/d/1BKSwNRCAS_9CiQ88-ZGjtstmChuyhjTi/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition duration-200"
                >
                    <FileText size={24} />
                    <span>Resume</span>
                </a>
            </div>
        </div>
    );
};

export default Identify;

