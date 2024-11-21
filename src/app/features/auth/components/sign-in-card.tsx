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

import { useAuthActions } from "@convex-dev/auth/react" 

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

function SignInCard({ setState }: SignInCardProps) {
  const { signIn } = useAuthActions();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pending, setPending] = React.useState(false);

  const onProviderSignIn =  (value: "github" | "google") => {
    setPending(true);
    signIn(value)
      .finally(() => {
        setPending(false);
      })
  }

  return (
    <Card className='full-w full-h p-8'>
      <CardHeader>
        <CardTitle>
          Login to continue
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5'>
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
          <Button type="submit" className='w-full' size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button 
            disabled={pending}
            onClick={() => onProviderSignIn('google')}
            variant="outline"
            size="lg" 
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-3 left-2.5' />
            Continue with Google
          </Button>
          <Button 
            disabled={pending}
            onClick={() => onProviderSignIn('github')}
            variant="outline"
            size="lg" 
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-3 left-2.5' />
            Continue with GitHub
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Don&apos;t have an account ? <span onClick={() => setState('signUp')} className='text-sky-700 hover:underline cursor-pointer'>Sign Up</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignInCard
