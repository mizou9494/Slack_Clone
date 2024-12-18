import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { 
  Card, 
  CardHeader, 
  CardDescription, 
  CardContent, 
  CardTitle 
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { SignInFlow } from './types'
import { TriangleAlert } from 'lucide-react'
import { useAuthActions } from '@convex-dev/auth/react'

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

function SignUpCard({ setState }: SignUpCardProps) {
  const { signIn } = useAuthActions();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState('');

  // this function in signUp page will create a new account if it does not exist in the database
  // but if it does exist then it will only sign the user in
  const onProviderSignUp =  (value: "github" | "google") => {
    setPending(true);
    signIn(value)
      .finally(() => {
        setPending(false);
      })
  }

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setPending(true)
    signIn("password", {email, password, flow: "signUp" })
      .catch(() => {
        setError("Invalid credentials");
      })
      .finally(() => {
        setPending(false);
      })
  }

  return (
    <Card className='full-w full-h p-8'>
      <CardHeader>
        <CardTitle>
          Sign up to continue
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <p>{error}</p> 
        </div>
      )}
      <CardContent className='space-y-5 px-0 pb-0'>
        <form onSubmit={onPasswordSignUp} className='space-y-2.5'>
          <Input 
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type="email"
            required
          />
          <Input 
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            type="password"
            required
          />
          <Input 
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm password'
            type="password"
            required
          />
          <Button type="submit" className='w-full' size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button 
            disabled={pending}
            onClick={() => onProviderSignUp('google')}
            variant="outline"
            size="lg" 
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-3 left-2.5' />
            Continue with Google
          </Button>
          <Button 
            disabled={pending}
            onClick={() => onProviderSignUp('github')}
            variant="outline"
            size="lg" 
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-3 left-2.5' />
            Continue with GitHub
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Already have an account ? <span onClick={() => setState('signUp')} className='text-sky-700 hover:underline cursor-pointer'>Sign in</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignUpCard
