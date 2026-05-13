'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Zap } from 'lucide-react';
import { useState, useRef } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const schema = z.object({
  job_description: z.string().trim().min(1, 'Offre requis'),
});

type FormType = z.infer<typeof schema>;

export default function HomePage() {
  const router = useRouter();

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      setCvFile(file);
      setFileName(file.name);
    }
  };

  const handleCancel = () => {
    setFileName(null);
    reset();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCvFile(file);
      setFileName(file.name);
    }
  };

  const onSubmit = async (data: FormType) => {
    const formData = new FormData();

    if (!cvFile) return;

    formData.append('cv', cvFile);
    formData.append('job_description', data.job_description);

    try {
      const res = await api.post('/analyses/match', formData);

      const id = res.data.analysis_id;

      router.push(`/result/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

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

      {/* Main */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto px-6 py-16"
      >
        {/* Card */}
        <div className="bg-background rounded-xl p-8 shadow-sm flex flex-col gap-7">
          {/* CV Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xl font-semibold text-slate-900">CV</label>
            <p className="text-xs text-foreground leading-relaxed mb-1">
              Formats acceptés : PDF, DOCX. Taille maximale 5 Mo.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg px-6 py-10 text-center cursor-pointer transition-colors
                ${
                  isDragging
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-border bg-background hover:bg-slate-50 hover:border-slate-300'
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                hidden
              />

              {fileName ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-medium text-slate-800">
                    {fileName}
                  </span>
                </div>
              ) : (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto mb-2.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-sm text-foreground">
                    Glissez votre fichier ici, ou{' '}
                    <span className="text-slate-800 font-semibold underline underline-offset-2">
                      parcourez
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-border -mx-8" />

          {/* Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-lg font-semibold text-slate-900">
              Offre
            </label>
            <p className="text-xs text-foreground leading-relaxed mb-1">
              Copier l'offre d'emploi ici:
            </p>
            <Textarea
              {...register('job_description')}
              placeholder="Bonjour, je me permets de vous adresser ma candidature pour…"
              className="h-40 text-xs p-4 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-around items-center gap-2.5 pt-1">
            <button
              onClick={handleCancel}
              className="h-12 text-md flex-1 px-5 py-2 font-medium text-slate-700 bg-background border border-slate-200
                         rounded-xl cursor-pointer hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <Button
              type="submit"
              className="flex-1 font-semibold rounded-xl h-12 text-md cursor-pointer"
            >
              Evaluer
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
