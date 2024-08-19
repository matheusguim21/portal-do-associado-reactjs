import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ThemeToggle } from '@theme/theme-toggle'
import { AxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/utils/api'

type RequestError = {
  message: string
}

const signinFormSchema = z.object({
  username: z
    .string({
      message: 'Insira um usuário',
    })
    .min(1, { message: 'Insira um usuário' }),
  password: z
    .string({
      message: 'Insira a sua senha',
    })
    .min(8, 'A senha têm no mínimo 8 caractéres')
    .max(16, 'A senha têm no máximo 16 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]*$/, {
      message:
        'A senha deve conter pelo menos um carácter maiúsculo, um minúsculo e um número',
    }),
})

type FormDataProps = z.infer<typeof signinFormSchema>

export function SignIn() {
  const form = useForm<FormDataProps>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      password: '',
    },
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  async function handleSignIn(data: FormDataProps) {
    try {
      console.log(data)

      api.post('/login', {
        username: data.username,
        password: data.password,
      })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message)
      }

      toast.error(
        'Não foi possível recuperar a sua senha tente novamente mais tarde',
      )
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="absolute bottom-5 right-5">
        <ThemeToggle />
      </div>
      <div className="p-8">
        {/* <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to={'/sign-up'}>Primeiro acesso</Link>
        </Button> */}
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex- flex-col justify-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar Portal do Associado
            </h1>
            <p className="text-sm text-muted-foreground">
              Cosulte suas obras, fonogramas, rendimentos e muito mais.
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sua senha</FormLabel>
                    <FormControl>
                      <div className="flex h-10 w-full items-center rounded-md border border-primary bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:border-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <Input
                          className="h-5 w-full border-none px-0 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder="Digite sua senha aqui"
                          {...field}
                        />
                        {isPasswordVisible ? (
                          <EyeOff
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                          />
                        ) : (
                          <Eye
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      É a senha que você recebeu em seu e-mail
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                variant={'default'}
                disabled={
                  form.formState.isSubmitting ||
                  form.getValues().password.length < 1 ||
                  form.getValues().username.length < 1
                }
                className="w-full"
                type="submit"
              >
                Acessar Portal
              </Button>
            </form>
            <Button type="button" className="px-0" variant={'link'} asChild>
              <Link to={'/esqueceu-senha'}>Esqueci a senha</Link>
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}
