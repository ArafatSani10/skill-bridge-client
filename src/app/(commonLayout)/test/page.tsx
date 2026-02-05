"use client"

import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function TestPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const data = await userService.getSession();
            setResult(data);
            setLoading(false);
        };
        checkSession();
    }, []);

    if (loading) return <p className="p-10">Checking session...</p>;

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-2xl font-bold">User Service Test</h1>
            <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-auto max-w-full">
                {JSON.stringify(result, null, 2)}
            </pre>
            
            {result.data ? (
                <p className="text-green-500 font-bold">✅ Session Active for: {result.data.user.name}</p>
            ) : (
                <p className="text-red-500 font-bold">❌ No Session Found: {result.error?.message}</p>
            )}
        </div>
    );
}