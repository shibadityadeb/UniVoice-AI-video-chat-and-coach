"use client"
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input} from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { authClient } from '@/lib/auth-client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card,CardContent } from '@/components/ui/card'
import { Alert,AlertTitle } from '@/components/ui/alert'
import { OctagonAlertIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
const formSchema = z.object({
  email:z.string().email(),
  password:z.string().min(1,{message:"Password is required"})
})



export const SignInView = () => {
  const router=useRouter()
  const [error,setError]=useState<string | null>(null)
  const [pending,setPending]=useState(false)
const form=useForm<z.infer<typeof formSchema>>({
resolver:zodResolver(formSchema),
defaultValues:{
  email:'',
  password:''
}
})
const onSubmit = async (data: z.infer<typeof formSchema>) => {
  setError(null);
  setPending(true);

  try {
    // Wrap the callback API in a Promise so we can await it
    await new Promise<void>((resolve, reject) => {
      authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
          {
            onSuccess: () => {
              resolve();
            },
            onError: (payload?: { error?: unknown }) => {
              reject(payload?.error ?? new Error("Sign in failed"));
            },
          }
      );
    });

    router.push("/");
  } catch (err: unknown) {
    // normalize error safely
    let message = "Something went wrong";
    if (typeof err === "string") {
      message = err;
    } else if (err && typeof err === "object" && "message" in err) {
      // Narrow to unknown then check message safely
      const maybe = err as { message?: unknown };
      if (typeof maybe.message === "string") {
        message = maybe.message;
      }
    }
    setError(message);
  } finally {
    setPending(false);
  }
};

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-card overflow-hidden rounded-2xl border shadow-xl">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
          
          <Form {...form}>
            <form className="p-6 md:p-10" onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center gap-1'>
                  <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight'>
                    Welcome back
                  </h1>
                  <p className='text-muted-foreground'>
                    Login to your account to continue
                  </p>
                </div>
                <div className='grid gap-4'>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder='you@example.com' className='h-10' {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder='••••••••' className='h-10' {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert variant="destructive" className='bg-red-50 text-red-900 border-none shadow-sm'>
                    <OctagonAlertIcon className='h-4 w-4 !text-destructive'/>
                    <AlertTitle className='text-sm'>
                      {error}
                    </AlertTitle>
                  </Alert>
                )}
                <Button
                  disabled={pending}
                  type="submit"
                  aria-busy={pending}
                  className={`h-11 w-full rounded-lg bg-black hover:bg-black/90 text-white shadow-md ${pending ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {pending ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className='relative text-center text-sm'>
                  <div className='absolute inset-0 top-1/2 -translate-y-1/2 border-t border-border'></div>
                  <span className='relative z-10 bg-card px-2 text-muted-foreground'>Or continue with</span>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                <Button variant='outline' type='button' className='w-full'>
                Google 
                </Button>
                </div>
                <div className='text-center text-sm'>
                  Don&#39;t have an account? <Link href='/sign-up' className='underline underline-offset-4 text-blue-700'>Sign up</Link>
                </div>

                </div>
            </form>
          </Form>

          {/* Right Column */}
          <div className="bg-gradient-to-b from-emerald-700 to-emerald-800 flex flex-col items-center justify-center gap-4 text-white h-48 md:h-full md:min-h-[420px] p-8 md:rounded-l-none rounded-b-2xl md:rounded-r-2xl">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white/10 ring-1 ring-white/30 shadow-md">
              <Image src="/logo.svg" alt="logo image" width={48} height={48} className="h-12 w-12 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]" />
            </div>
            <p className="text-3xl font-semibold">UniVoice</p>
          </div>
          
        </CardContent>
      </Card>
      
    </div>
  )
}
