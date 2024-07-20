import React, { useState, useEffect } from 'react';

 const Alert = ({ type, message, onClose, duration = 5000 }) => {
    const isSuccess = type === 'success';
    const alertStyles = isSuccess
        ? "bg-teal-50 border border-teal-200 text-teal-800 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
        : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500";
    const buttonStyles = isSuccess
        ? "bg-teal-50 text-teal-500 hover:bg-teal-100 focus:ring-offset-teal-50 focus:ring-teal-600 dark:bg-transparent dark:hover:bg-teal-800/50 dark:text-teal-600"
        : "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600 dark:bg-transparent dark:hover:bg-red-800/50 dark:text-red-600";
    const icon = isSuccess ? (
        <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
        </svg>
    ) : (
        <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="M12 8v4m0 4h.01"></path>
        </svg>
    );

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={`hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 ${alertStyles} text-sm rounded-lg p-4 fixed top-4 right-4 z-50`} role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div className="ms-2">
                    <div className="text-sm font-medium">
                        {message}
                    </div>
                </div>
                <div className="ps-3 ms-auto">
                    <div className="-mx-1.5 -my-1.5">
                        <button onClick={onClose} type="button" className={`inline-flex rounded-lg p-1.5 ${buttonStyles} focus:outline-none focus:ring-2`}>
                            <span className="sr-only">Dismiss</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;