import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signinFormSchema = z.object({
  email: z.string().email('Digite um e-mail válido'),
})

type FormDataProps = z.infer<typeof signinFormSchema>

export function SignIn() {
  const { formState, register, handleSubmit } = useForm<FormDataProps>()

  async function handleSignIn(data: FormDataProps) {
    try {
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Enviamos um link de autenticação para o seu e-mail', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch (error) {
      toast.error('E-mail inválido')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to={'/sign-up'}>Novo Estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex- flex-col justify-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar Painel
            </h1>
            <p className="font-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button
              disabled={formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
