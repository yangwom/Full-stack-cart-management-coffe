'use client'
import { FormEvent, useState } from "react"
import style from "./FormLogin.module.css"
import supabase from "@/supabase";
import LoginPage from "@/app/login/page";
import { NextRouter } from "next/router";
import { useRouter } from "next/navigation";

type formProps =  {
    router: NextRouter
}

export function FormLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleChangeSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if (error) {
                throw error
            }
            router.push('/order')
        } catch (error) {
            alert(error)
        }

    }
    return (

        <form onSubmit={handleChangeSubmit} className={style.loginForm} action="">
            <strong className={style.loginTitle}>Faça o seu login</strong>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className={style.loginInput} name="email" placeholder="email" type="text" />
            <input onChange={(e) => setPassword(e.target.value)} value={password} className={style.loginInput} name="password" placeholder="password" type="password" />
            <button className={style.buttonSubmit} type="submit">Submit</button>
        </form>

    )
}

