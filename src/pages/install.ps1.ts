import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const response = await fetch('https://github.com/hjbdev/pvm/releases/latest/download/install.ps1');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch install script: ${response.statusText}`);
    }

    const script = await response.text();

    return new Response(script, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        // Instruct browsers and CDNs to cache this file for 1 hour
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      },
    });
  } catch (error) {
    console.error('Error fetching install.ps1:', error);
    return new Response('Error fetching the installation script.', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    });
  }
};
