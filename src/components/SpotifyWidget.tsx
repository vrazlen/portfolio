import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';

interface SpotifyData {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    url: string;
}

export default function SpotifyWidget() {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real deployment, this fetches from the generated JSON file
        fetch('/portfolio/data/spotify.json')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(() => {
                // Fallback or error state
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center gap-4 p-4 animate-pulse">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-slate-400">
                    <Music size={24} />
                </div>
                <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Not Playing</p>
                    <p className="text-sm text-slate-500">Spotify</p>
                </div>
            </div>
        )
    }

    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 group"
        >
            <div className="relative w-12 h-12 shrink-0">
                <img
                    src={data.albumArt}
                    alt={data.album}
                    className={`w-full h-full rounded-md object-cover shadow-sm ${data.isPlaying ? 'animate-spin-slow' : ''}`}
                />
                {data.isPlaying && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-surface-900 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-accent transition-colors">
                    {data.title}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {data.artist}
                </p>
            </div>
        </a>
    );
}
