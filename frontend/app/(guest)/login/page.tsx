'use client';

import Image from 'next/image';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Eye, EyeOff, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  const googleOAuth = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect`;

    window.location.href = redirectUri;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col gap-8 items-center justify-center px-4 py-12">
      {/* ── Logo + nom de l'app ─────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-2xl">
          <Zap size={40} strokeWidth={1.8} className="text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          <span className="bg-clip-text text-transparent bg-primary">CV</span>{' '}
          Matching
        </h1>
      </div>

      {/* ── Card ────────────────────────────────────────────────────── */}
      <Card className="w-full max-w-sm shadow-md px-5 py-10">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-semibold text-center">
            Connexion
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Entrez vos identifiants pour continuer
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="uppercase text-xs font-semibold text-muted-foreground"
              >
                Adresse email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Adresse email"
                autoComplete="email"
                className="h-10"
              />
            </div>

            {/* Mot de passe */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="uppercase text-xs font-semibold text-muted-foreground"
                >
                  Mot de passe
                </Label>
                <button
                  type="button"
                  className="text-primary hover:underline cursor-pointer"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Masquer' : 'Afficher'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Bouton principal */}
            <Button
              type="submit"
              className="w-full font-semibold rounded-xl h-12 text-lg cursor-pointer"
            >
              Se connecter
            </Button>

            {/* Séparateur */}
            <div className="relative text-center">
              <span className="text-muted-foreground">ou</span>
            </div>

            {/* Google */}

            <Button
              size="lg"
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-3 cursor-pointer hover:bg-foreground/10"
              onClick={googleOAuth}
            >
              <Image
                src="/icons/google.svg"
                alt="G"
                height={20}
                width={20}
                className="h-5 w-5"
              />

              <span>Continuer avec Google</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Pas encore de compte ?{' '}
        <button className="font-semibold text-primary hover:underline">
          Créer un compte
        </button>
      </p>
    </div>
  );
}
