"use client";

import { useState } from "react";
import { Eye, EyeOff, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">

      {/* ── Logo + nom de l'app ─────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-2xl">
          <Zap size={40} strokeWidth={1.8} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          MatchinCv
        </h1>
      </div>

      {/* ── Card ────────────────────────────────────────────────────── */}
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl font-semibold text-center">
            Connexion
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Entrez vos identifiants pour continuer
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              autoComplete="email"
            />
          </div>

          {/* Mot de passe */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <button
                type="button"
                className="text-xs text-primary hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Masquer" : "Afficher"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Bouton principal */}
          <Button className="w-full font-semibold">
            Se connecter
          </Button>

          {/* Séparateur */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ou</span>
            <Separator className="flex-1" />
          </div>

          {/* Google */}
          <Button variant="outline" className="w-full gap-2">
            Continuer avec Google
          </Button>

        </CardContent>

        <CardFooter className="justify-center pt-0 pb-5">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
            >
              Créer un compte
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}