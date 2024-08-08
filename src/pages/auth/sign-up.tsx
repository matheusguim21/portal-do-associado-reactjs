import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signupFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email('Digite um e-mail válido'),
})

type FormDataProps = z.infer<typeof signupFormSchema>

export function SignUp() {
  const { formState, register, handleSubmit } = useForm<FormDataProps>()

  const navigate = useNavigate()
  async function handleSignUp(data: FormDataProps) {
    try {
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Restaurante cadastrado com sucesso', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante')
    }
  }

  return (
    <>
      <Helmet title="Cadastrar-se" />
      <div className="p-8">
        <Button variant={'ghost'} asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer Login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex- flex-col justify-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Criar conta grátis
            </h1>
            <p className="font-sm text-muted-foreground">
              Seja um parceiro e comece as vendas
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelcimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu Nome</Label>
              <Input
                autoCapitalize="words"
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="text" {...register('phone')} />
            </div>

            <Button
              disabled={formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              Acessar Painel
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao clicar em continuar você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                Termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                Políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
