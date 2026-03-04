import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Use environment variable for the script URL to allow different destinations per deployment
        const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

        if (!scriptUrl) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Proxy request to Google Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Google Script responded with status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ error: 'Failed to submit survey' }, { status: 500 });
    }
}
