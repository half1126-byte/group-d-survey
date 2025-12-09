import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Hardcoded URL for easy deployment avoiding Env vars setup
        const scriptUrl = "https://script.google.com/macros/s/AKfycbziEmQVaxFvWDYEbXXy6SUCA80VYQqbkKaUOf25jFqlbe7-lq7TJrghi7xpHlxO29Qd/exec";

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
