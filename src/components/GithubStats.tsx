import React from 'react';
import { Star, GitFork } from 'lucide-react';

interface Repository {
    name: string;
    description: string;
    url: string;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage: {
        name: string;
        color: string;
    };
}

// In a real app, this would be passed as props from the Astro build-time fetch
// But for the "island" feel, we can also make it interactive or fetch client-side if needed.
// Here we will accept props to render the static data with React interactivity (like hover effects).

interface Props {
    repos: Repository[];
}

export default function GithubStats({ repos }: Props) {
    return (
        <div className="flex flex-col gap-3 p-4">
            {repos.map((repo) => (
                <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/50"
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                            {repo.name}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <Star size={12} /> {repo.stargazerCount}
                            </span>
                            <span className="flex items-center gap-1">
                                <GitFork size={12} /> {repo.forkCount}
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {repo.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: repo.primaryLanguage.color }}
                        />
                        <span className="text-xs text-slate-500">{repo.primaryLanguage.name}</span>
                    </div>
                </a>
            ))}
        </div>
    );
}
