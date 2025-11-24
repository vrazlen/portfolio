import fs from 'fs';
import { getNowPlaying, getRecentlyPlayed } from '../src/lib/spotify.ts';

// Note: In a real environment, we might need to compile this TS or run it with ts-node.
// For simplicity in this "serverless on static" setup, we will write a pure JS version for the script
// or assume the environment can handle TS (e.g. using bun or tsx). 
// However, the user asked for Node scripts. I will write a JS version here that mirrors the logic
// but is self-contained to avoid import issues in the CI environment without a build step for scripts.

/* 
   SELF-CONTAINED NODE SCRIPT FOR CI/CD 
   Run with: node scripts/refresh-spotify.js
*/

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fsPromises = fs.promises;

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
    });
    return response.json();
}

async function main() {
    try {
        const { access_token } = await getAccessToken();

        // Try fetching Now Playing
        const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        let data = null;

        if (nowPlayingRes.status === 204 || nowPlayingRes.status > 400) {
            // Nothing playing, fallback to recently played
            const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            const recentData = await recentlyPlayedRes.json();
            const track = recentData.items[0].track;

            data = {
                isPlaying: false,
                title: track.name,
                artist: track.artists.map((_artist) => _artist.name).join(', '),
                album: track.album.name,
                albumArt: track.album.images[0].url,
                url: track.external_urls.spotify,
            };
        } else {
            const nowPlayingData = await nowPlayingRes.json();
            data = {
                isPlaying: nowPlayingData.is_playing,
                title: nowPlayingData.item.name,
                artist: nowPlayingData.item.artists.map((_artist) => _artist.name).join(', '),
                album: nowPlayingData.item.album.name,
                albumArt: nowPlayingData.item.album.images[0].url,
                url: nowPlayingData.item.external_urls.spotify,
            };
        }

        await fsPromises.writeFile('./public/data/spotify.json', JSON.stringify(data, null, 2));
        console.log('Spotify data updated!');

    } catch (error) {
        console.error('Error updating Spotify data:', error);
        process.exit(1);
    }
}

main();
