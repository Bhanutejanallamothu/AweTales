"use client";

import React from 'react';
import css from '../login/auth.module.css';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className={`container flex-center ${css.page}`}>
      <Card glow className="form-container">
        <h1 className="form-title text-gradient">Create Account</h1>
        <form className={css.form} onSubmit={(e) => e.preventDefault()}>
          <div className={css.row}>
            <Input id="firstName" label="First Name" placeholder="First Name" />
            <Input id="lastName" label="Last Name" placeholder="Last Name" />
          </div>
          <Input id="email" label="Email Address" type="email" placeholder="you@example.com" />
          <Input id="password" label="Password" type="password" placeholder="••••••••" />
          <Input id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" />
          
          <Button variant="primary" className={css.submitBtn} href="/dashboard">
            Create Account
          </Button>

          <p className={css.switchMode}>
            Already have an account? <Link href="/login">Sign In</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
