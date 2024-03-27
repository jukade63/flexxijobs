"use server"

import { FormFields } from "@/app/(root)/business/sign-up/_component.ts/SignUpForm"
import { BACKEND_URL } from "@/lib/constants"

export const signUpUser = async (data: FormFields, userType: "worker" | "business") => {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userType }),
    })
    if (!res.ok) {
        const error = await res.json()
        return {
            error: error.message,
        }
    }
    return {
        message: "User created successfully, please check your email to activate your account",
    }
}

export const activateAccount = async (token: string) => {
    const response = await fetch(`${BACKEND_URL}/auth/activate-account`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    })
    const data = await response.json()
    
    if (!response.ok) {
        return {
            error: data.message,
            status: 'error'
        }
    }
    return {
        message: data.message,
        status: 'success'
    }
    
}

export const sendForgetPasswordEmail = async (email: string) => {
    const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (res.status === 400) {
        throw Error('Incorrect email address');
    }

}

export const resetPassword = async (password: string, token: string | null) => {
    const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, token}),
    });

    if (!res.ok) {
        const error = await res.json();
        return {
            error: error.message
        }
    }

}