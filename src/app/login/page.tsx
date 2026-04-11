"use client";

import React from 'react';
import css from './auth.module.css';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Login() {
  return (
    <div className={`container flex-center ${css.page}`}>
      <Card glow className="form-container">
        <h1 className="form-title text-gradient">Welcome Back</h1>
        <form className={css.form} onSubmit={(e) => e.preventDefault()}>
          <Input id="email" label="Email Address" type="email" placeholder="you@example.com" />
          <Input id="password" label="Password" type="password" placeholder="••••••••" />
          
          <div className={css.formLinks}>
            <Link href="#" className={css.forgotLink}>Forgot Password?</Link>
          </div>
          
          <Button variant="primary" className={css.submitBtn}>
            Sign In
          </Button>

          <p className={css.switchMode}>
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
