import { useState } from 'react'

export function useCpfCnpjMask() {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '') // Remove tudo que não é número
    if (input.length > 14) return // Impede a entrada acima de 14 caracteres

    if (input.length <= 11) {
      // CPF
      const cpf = input
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      setValue(cpf)
    } else {
      // CNPJ
      const cnpj = input
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
      setValue(cnpj)
    }
  }

  return { value, onChange: handleChange }
}
