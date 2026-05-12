'use client';
import { useState, useRef } from "react";

export default function HomePage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleCancel = () => {
    setFileName(null);
    setCoverLetter("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-serif">

      {/* Header */}
      <header className="px-10 py-5 border-b border-border flex items-center">
        <div className="flex items-center gap-2.5">
          <span className="text-lg font-bold tracking-tight">MatchingCV</span>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-xl mx-auto px-6 py-16">

        

        {/* Card */}
        <div className="bg-background border border-border rounded-xl p-8 shadow-sm flex flex-col gap-7">

          {/* CV Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-900">
              Curriculum Vitæ
            </label>
            <p className="text-xs text-foreground leading-relaxed mb-1">
              Formats acceptés : PDF, DOCX. Taille maximale 5 Mo.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg px-5 py-7 text-center cursor-pointer transition-colors
                ${isDragging
                  ? "border-slate-900 bg-slate-50"
                  : "border-border bg-background hover:bg-slate-50 hover:border-slate-300"
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              {fileName ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="#22c55e" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-medium text-slate-800">{fileName}</span>
                </div>
              ) : (
                <>
                  <svg
                    width="22" height="22" viewBox="0 0 24 24"
                    fill="none" stroke="#94a3b8" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="mx-auto mb-2.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-sm text-foreground">
                    Glissez votre fichier ici, ou{" "}
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
            <label className="text-sm font-semibold text-slate-900">
              Lettre de motivation
            </label>
            <p className="text-xs text-foreground leading-relaxed mb-1">
              Expliquez pourquoi vous postulez à ce poste et ce qui vous motive.
            </p>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Bonjour, je me permets de vous adresser ma candidature pour…"
              rows={6}
              className="w-full px-3.5 py-3 text-sm text-slate-900 bg-background border border-slate-200
                         rounded-lg resize-y outline-none font-serif leading-relaxed placeholder:text-foreground
                         focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-around items-center gap-2.5 pt-1">
            <button
              onClick={handleCancel}
              className="px-5 py-2 text-sm font-medium text-slate-700 bg-background border border-slate-200
                         rounded-md cursor-pointer hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              className="px-5 py-2 text-sm font-semibold text-white bg-slate-900
                         rounded-md cursor-pointer hover:bg-slate-700 transition-colors"
            >
              Soumettre
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}