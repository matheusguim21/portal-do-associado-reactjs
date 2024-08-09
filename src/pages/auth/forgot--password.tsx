import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ThemeToggle } from '@theme/theme-toggle'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  username: z
    .string({
      message: 'Digite seu usuário',
    })
    .min(1, 'Digite seu usuário'),
})
type FormDataProps = z.infer<typeof forgotPasswordSchema>

export function ForgotPassword() {
  const form = useForm<FormDataProps>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  function handleSignIn(data: FormDataProps) {
    toast('Enviamos um e-mail para você com link de recuperaçãop de senha', {
      duration: 3000,
    })
  }

  return (
    <>
      <Helmet title="Esqueci a senha" />
      <div className="absolute bottom-5 right-5">
        <ThemeToggle />
      </div>
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to={'/sign-in'}>Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex- flex-col justify-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Recuperação de Senha
            </h1>
            <p className="text-sm text-muted-foreground">
              Insira seu nome de usuário usado para acessar o Portal
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignIn)}
              className="space-y-4"
            >
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu usuário</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Digite seu usuário aqui"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      É o nome de usuário que você recebeu por e-mail
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                className="w-full"
                type="submit"
              >
                Recuperar senha
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
