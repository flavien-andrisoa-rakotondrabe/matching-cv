'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Analysis = {
  score: number;
};

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  const size = 250;
  const stroke = 16;
  const radius = (size - stroke) / 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/analyses/${id}`);
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const score = data?.score ?? 0;

  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const offset = useMemo(() => {
    return circumference - (score / 100) * circumference;
  }, [score, circumference]);

  const color =
    score < 40
      ? 'stroke-red-500'
      : score < 70
        ? 'stroke-yellow-500'
        : 'stroke-green-500';

  const textColor =
    score < 40
      ? 'text-red-500'
      : score < 70
        ? 'text-yellow-500'
        : 'text-green-500';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-serif">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="bg-primary/10 border border-primary/20 p-2 rounded-lg">
          <Zap className="text-primary size-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          <span className="bg-clip-text text-transparent bg-primary">CV</span>{' '}
          Matching
        </h1>
      </div>

      <main className="max-w-xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center gap-2 mb-5">
          {/* Cercle */}
          <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="-rotate-90">
              {/* background */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-muted-foreground/10"
                strokeWidth={stroke}
                fill="transparent"
              />

              {/* progress */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className={`${color} transition-all duration-700`}
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>

            {/* centre */}
            <div className={cn('absolute text-5xl font-bold', textColor)}>
              {Math.ceil(score)}%
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-around items-center gap-4 pt-1">
          <Link
            href="/home"
            className="h-12 text-center flex justify-center items-center text-md flex-1 px-5 py-2 font-medium text-slate-700 bg-background border border-slate-200
                         rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
          >
            Revenir
          </Link>
          <Button
            type="submit"
            className="flex-1 font-semibold rounded-xl h-12 text-md cursor-pointer"
          >
            Télécharger le rapport
          </Button>
        </div>
      </main>
    </div>
  );
}
